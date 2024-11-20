import os
import openai
import numpy as np
import faiss
from PyPDF2 import PdfReader
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv


# Load environment variables from .env file
load_dotenv()


app = Flask(__name__)
CORS(app)


openai.api_key = os.getenv("OPENAI_API_KEY")


# Directory containing PDF documents
documents_directory = os.path.join(os.path.dirname(__file__), "..", "app", "documents")


def split_text_into_chunks(text, max_tokens=3000):
    words = text.split()
    chunks = []
    current_chunk = []
    current_length = 0


    for word in words:
        current_length += len(word) + 1
        if current_length > max_tokens:
            chunks.append(" ".join(current_chunk))
            current_chunk = [word]
            current_length = len(word) + 1
        else:
            current_chunk.append(word)


    if current_chunk:
        chunks.append(" ".join(current_chunk))


    return chunks


# Extract text from PDFs and split into chunks
documents = []
for filename in os.listdir(documents_directory):
    if filename.endswith(".pdf"):
        file_path = os.path.join(documents_directory, filename)
        try:
            reader = PdfReader(file_path)
            text = ""
            for page in reader.pages:
                text += page.extract_text()


            # Split text into chunks
            document_chunks = split_text_into_chunks(text)
            documents.extend(document_chunks)
        except Exception as e:
            print(f"Error reading {filename}: {e}")


# Generate embeddings for each document chunk
embeddings = []
for doc in documents:
    try:
        response = openai.Embedding.create(
            input=doc,
            model="text-embedding-ada-002"
        )
        embedding = response['data'][0]['embedding']
        embeddings.append(embedding)
    except Exception as e:
        print(f"Error creating embedding: {e}")
        continue


# Create a FAISS index
embedding_matrix = np.array(embeddings, dtype=np.float32)
index = faiss.IndexFlatL2(embedding_matrix.shape[1])
index.add(embedding_matrix)


# Save and load the FAISS index
faiss.write_index(index, "index_file.index")
index = faiss.read_index("index_file.index")


@app.route('/api/get-answer', methods=['POST'])
def get_answer():
    question = request.json['question']
    try:
        # Generate an embedding for the user's question
        response = openai.Embedding.create(
            input=question,
            model="text-embedding-ada-002"
        )
        question_embedding = response['data'][0]['embedding']
        question_vector = np.array([question_embedding], dtype=np.float32)


        # Search for the most relevant document
        distances, indices = index.search(question_vector, k=1)
        relevant_doc = documents[indices[0][0]]


        # Use GPT to generate an answer
        gpt_response = openai.ChatCompletion.create(
            model="gpt-4",
            temperature=0.5,
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
                {"role": "user", "content": f"Document: {relevant_doc}"},
                {"role": "user", "content": question}
            ]
        )


        answer = gpt_response['choices'][0]['message']['content']
        return jsonify({'answer': answer})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
