import os
import openai
import numpy as np
import faiss
from PyPDF2 import PdfReader
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

CORS(app)

openai.api_key = "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"

# Directory containing PDF documents
documents_directory = "C:\\Users\\clayt\\Documents\\GitHub\\noble\\app\\documents"

# Helper function to split text into chunks
def split_text_into_chunks(text, max_tokens=8192):
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

documents = []

for filename in os.listdir(documents_directory):
    if filename.endswith(".pdf"):
        file_path = os.path.join(documents_directory, filename)
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()

        # Split text into chunks if it's too large
        document_chunks = split_text_into_chunks(text, max_tokens=8192)
        documents.extend(document_chunks)

embeddings = []
for doc in documents:
    response = openai.Embedding.create(
        input=doc,
        model="text-embedding-ada-002"
    )
    embedding = response['data'][0]['embedding']
    embeddings.append(embedding)

embedding_matrix = np.array(embeddings)

index = faiss.IndexFlatL2(embedding_matrix.shape[1])
index.add(embedding_matrix)

faiss.write_index(index, "index_file.index")

index = faiss.read_index("index_file.index")

@app.route('/api/get-answer', methods=['POST'])
def get_answer():
    question = request.json['question']
    response = openai.Embedding.create(
        input=question,
        model="text-embedding-ada-002"
    )
    question_embedding = response['data'][0]['embedding']
    question_vector = np.array([question_embedding], dtype=np.float32)
    distances, indices = index.search(question_vector, k=1)
    relevant_doc = documents[indices[0][0]]

    gpt_response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "This GPT should answer simple medical questions based on files from the MEDSTANDARDS app uploaded to the knowledge. It should not provide answers based on web browsing and should reference where the information came from after every answer by providing the document's name."},
            {"role": "user", "content": f"Document: {relevant_doc}"},
            {"role": "user", "content": question}
        ]
    )

    answer = gpt_response['choices'][0]['message']['content']
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)
