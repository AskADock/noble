import os
import openai
import numpy as np
import faiss
from PyPDF2 import PdfReader

openai.api_key = "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
"

# Directory containing PDF documents
documents_directory = "C:\\Users\\clayt\\Documents\\GitHub\\noble\\app\\documents"
"

documents = []
for filename in os.listdir(documents_directory):
    if filename.endswith(".pdf"):
        file_path = os.path.join(documents_directory, filename)
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        documents.append(text)

# Embed documents
embeddings = [openai.Embedding.create(input=doc, model="text-embedding-ada-002")['data'][0]['embedding'] for doc in documents]
embedding_matrix = np.array(embeddings)

# Create and save FAISS index
index = faiss.IndexFlatL2(embedding_matrix.shape[1])
index.add(embedding_matrix)
faiss.write_index(index, "index_file.index")
