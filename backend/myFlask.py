import os
import openai
import numpy as np
import faiss
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import pickle
import logging
import fitz  # PyMuPDF
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
documents_directory = os.path.join(os.path.dirname(__file__), "..", "backend", "documents")
if not os.path.exists(documents_directory):
    logger.error(f"Documents directory not found: {documents_directory}")
    raise FileNotFoundError(f"Documents directory not found: {documents_directory}")

# Paths to the saved embeddings, documents, and index
EMBEDDINGS_FILE = 'embeddings.npy'
DOCUMENTS_FILE = 'documents.pkl'
INDEX_FILE = 'index_file.index'

# Load embeddings, documents, and index
if os.path.exists(EMBEDDINGS_FILE) and os.path.exists(DOCUMENTS_FILE) and os.path.exists(INDEX_FILE):
    embedding_matrix = np.load(EMBEDDINGS_FILE)
    with open(DOCUMENTS_FILE, 'rb') as f:
        documents = pickle.load(f)
    index = faiss.read_index(INDEX_FILE)
    logger.info(f"Loaded embeddings, documents, and index. Total documents: {len(documents)}")
else:
    logger.error("Embeddings, documents, or index files are missing.")
    raise FileNotFoundError("Embeddings, documents, or index files are missing.")

def split_text_into_chunks(text, max_tokens=3000, model_name='text-embedding-ada-002'):
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
        logger.info(f"Generated question embedding size: {len(question_embedding)}")

        # Ensure index and documents are loaded
        if index is None or not documents:
            logger.error("Index or documents not properly initialized.")
            return jsonify({'error': 'Server error: Index not initialized.'}), 500

        # Perform FAISS search
        k = min(3, len(documents))
        distances, indices = index.search(question_vector, k=k)
        logger.info(f"FAISS search indices: {indices}, distances: {distances}")

        # Retrieve relevant documents
        relevant_docs = [documents[idx] for idx in indices[0] if idx < len(documents)]
        if not relevant_docs:
            logger.warning("No relevant documents found for the question.")
            return jsonify({'error': 'No relevant documents found.'}), 404

        # Prepare context for GPT
        context = "\n\n".join(relevant_docs)
        logger.info(f"Context passed to GPT: {context[:500]}")  # Log the first 500 characters

        # Use GPT to generate an answer
        gpt_response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            temperature=0.5,
            messages=[
                {"role": "system", "content": (
                    "You are a virtual medical assistant named Noble created to answer medical questions for "
                    "the Hawaii Air National Guard members. All answered information should come from the uploaded "
                    "files and should be answered with citations including page numbers, document titles, and the year "
                    "the document was created. Use markdown formatting to make the answer more readable. "
                    "Find information for both flyers and non-flyers. Specify information given to both flyers and non-flyers. "
                    "If you cannot find the information, state explicitly that it is not available in the documents."
                )},
                {"role": "user", "content": f"Context:\n\n{context}\n\nQuestion:\n{question}"}
            ]
        )
        answer = gpt_response['choices'][0]['message']['content']
        logger.info(f"GPT Response: {answer}")
        return jsonify({'answer': answer})
    except Exception as e:
        logger.error(f"Error generating answer: {e}")
        return jsonify({'error': 'Error generating answer.'}), 500

if __name__ == '__main__':
    try:
        app.run(debug=True)
    except Exception as e:
        logger.error(f"Failed to start the server: {e}")
        raise
