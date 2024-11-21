import os
import openai
import numpy as np
import faiss
from PyPDF2 import PdfReader
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import pickle
import logging
import tiktoken
import time

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Set OpenAI API key
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    logger.error("OPENAI_API_KEY not found in environment variables.")
    raise ValueError("OPENAI_API_KEY not found in environment variables.")
openai.api_key = openai_api_key

# Directory containing PDF documents
documents_directory = os.path.join(os.path.dirname(__file__), "documents")
if not os.path.exists(documents_directory):
    logger.error(f"Documents directory not found: {documents_directory}")
    raise FileNotFoundError(f"Documents directory not found: {documents_directory}")

def split_text_into_chunks(text, max_tokens=8191, model_name='text-embedding-ada-002'):
    # Use tiktoken to count tokens
    encoding = tiktoken.encoding_for_model(model_name)
    tokens = encoding.encode(text)
    chunks = []
    start = 0
    while start < len(tokens):
        end = start + max_tokens
        chunk_tokens = tokens[start:end]
        chunk_text = encoding.decode(chunk_tokens)
        chunks.append(chunk_text)
        start = end
    return chunks

# Paths to the saved embeddings, documents, and index
EMBEDDINGS_FILE = 'embeddings.npy'
DOCUMENTS_FILE = 'documents.pkl'
INDEX_FILE = 'index_file.index'

# Initialize variables
documents = []
embedding_matrix = None
index = None

try:
    # Check if embeddings and documents are already saved
    if os.path.exists(EMBEDDINGS_FILE) and os.path.exists(DOCUMENTS_FILE) and os.path.exists(INDEX_FILE):
        # Load embeddings
        embedding_matrix = np.load(EMBEDDINGS_FILE)
        # Load documents
        with open(DOCUMENTS_FILE, 'rb') as f:
            documents = pickle.load(f)
        # Load FAISS index
        index = faiss.read_index(INDEX_FILE)
        logger.info("Loaded embeddings, documents, and index from disk.")
    else:
        # Extract text from PDFs and split into chunks
        for filename in os.listdir(documents_directory):
            if filename.endswith(".pdf"):
                file_path = os.path.join(documents_directory, filename)
                try:
                    reader = PdfReader(file_path)
                    text = ""
                    for page_num, page in enumerate(reader.pages):
                        page_text = page.extract_text()
                        if page_text:
                            text += page_text
                        else:
                            logger.warning(f"No text found on page {page_num+1} of {filename}.")
                    # Split text into chunks
                    document_chunks = split_text_into_chunks(text)
                    documents.extend(document_chunks)
                except Exception as e:
                    logger.error(f"Error reading {filename}: {e}")

        if not documents:
            logger.error("No documents found to process.")
            raise ValueError("No documents found to process.")

        # Generate embeddings for each document chunk
        embeddings = []
        for idx, doc in enumerate(documents):
            try:
                # Implement retry logic
                max_retries = 5
                for attempt in range(max_retries):
                    try:
                        response = openai.Embedding.create(
                            input=doc,
                            model="text-embedding-ada-002",
                            timeout=30  # Set timeout in seconds
                        )
                        embedding = response['data'][0]['embedding']
                        embeddings.append(embedding)
                        break  # Break if successful
                    except openai.error.RateLimitError as e:
                        logger.error(f"Rate limit error on chunk {idx}, attempt {attempt+1}/{max_retries}: {e}")
                        if attempt < max_retries - 1:
                            time.sleep(2 ** attempt)  # Exponential backoff
                        else:
                            raise
                    except openai.error.Timeout as e:
                        logger.error(f"Timeout error on chunk {idx}, attempt {attempt+1}/{max_retries}: {e}")
                        if attempt < max_retries - 1:
                            time.sleep(2 ** attempt)
                        else:
                            raise
                    except Exception as e:
                        logger.error(f"Error creating embedding for document chunk {idx}, attempt {attempt+1}/{max_retries}: {e}")
                        if attempt < max_retries - 1:
                            time.sleep(2 ** attempt)
                        else:
                            raise
            except Exception as e:
                logger.error(f"Failed to create embedding for document chunk {idx}: {e}")
                continue

        if not embeddings:
            logger.error("No embeddings were created. Please check the documents and OpenAI API key.")
            raise ValueError("No embeddings were created.")

        # Convert embeddings to numpy array
        embedding_matrix = np.array(embeddings, dtype=np.float32)
        # Save embeddings
        np.save(EMBEDDINGS_FILE, embedding_matrix)
        # Save documents
        with open(DOCUMENTS_FILE, 'wb') as f:
            pickle.dump(documents, f)
        # Create a FAISS index
        dimension = embedding_matrix.shape[1]
        index = faiss.IndexFlatL2(dimension)
        index.add(embedding_matrix)
        # Save the FAISS index
        faiss.write_index(index, INDEX_FILE)
        logger.info("Computed and saved embeddings, documents, and index.")

except Exception as e:
    logger.error(f"An error occurred during initialization: {e}")
    raise

@app.route('/api/get-answer', methods=['POST'])
def get_answer():
    data = request.json
    if not data or 'question' not in data:
        logger.error("No question provided in the request.")
        return jsonify({'error': 'No question provided.'}), 400

    question = data['question']
    if not question.strip():
        logger.error("Received an empty question.")
        return jsonify({'error': 'Question is empty.'}), 400

    try:
        # Generate an embedding for the user's question
        response = openai.Embedding.create(
            input=question,
            model="text-embedding-ada-002",
            timeout=30
        )
        question_embedding = response['data'][0]['embedding']
        question_vector = np.array([question_embedding], dtype=np.float32)

        # Ensure index and documents are loaded
        if index is None or not documents:
            logger.error("Index or documents not properly initialized.")
            return jsonify({'error': 'Server error: Index not initialized.'}), 500

        # Search for the most relevant documents
        k = min(3, len(documents))  # Adjust k as needed
        distances, indices = index.search(question_vector, k=k)
        if indices.size == 0:
            logger.warning("No relevant documents found for the question.")
            return jsonify({'error': 'No relevant documents found.'}), 404

        relevant_docs = [documents[idx] for idx in indices[0]]

        # Prepare the context for GPT
        context = "\n\n".join(relevant_docs)

        # Use GPT to generate an answer
        gpt_response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            temperature=0.7,
            messages=[
                {"role": "system", "content": (
                    "You are a virtual medical assistant named Noble created to answer medical questions for "
                    "the Hawaii Air National Guard members. All answered information should come from the uploaded "
                    "files and should be answered with citations including page numbers, document titles, and the year "
                    "the document was created. Use markdown formatting to make the answer more readable. "
                    "Find information for both flyers and nonflyers. Specify information given to both flyers and nonflyers. "
                    "If the user asks a question that is not related to the documents, politely respond that you are tuned "
                    "to only answer questions that are related to the documents. When receiving a question without a clear answer, "
                    "direct the user to contact a medical professional for more accurate information. Use very descriptive wording "
                    "when giving an answer to a user’s questions. If necessary, format the information in step-by-step details."
                )},
                {"role": "user", "content": f"Context: {context}"},
                {"role": "user", "content": question}
            ],
            timeout=60  # Set a timeout
        )

        answer = gpt_response['choices'][0]['message']['content']
        return jsonify({'answer': answer})
    except openai.error.OpenAIError as e:
        logger.error(f"OpenAI API error: {e}")
        return jsonify({'error': f'OpenAI API error: {e}'}), 500
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        return jsonify({'error': f'An error occurred: {e}'}), 500

if __name__ == '__main__':
    try:
        app.run(host='0.0.0.0', port=5000)
    except Exception as e:
        logger.error(f"Failed to start the server: {e}")
        raise
