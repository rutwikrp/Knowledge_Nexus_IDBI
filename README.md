# 🧠 Knowledge Nexus
### AI-Powered Enterprise Knowledge Platform

Knowledge Nexus is an AI-powered internal knowledge platform that enables organizations to upload technical documents and instantly query them using natural language.

Instead of manually searching through hundreds of pages, employees can simply ask questions and receive accurate, context-aware answers with source citations.

---

## 🚀 Problem Statement

Organizations maintain thousands of PDFs, manuals, SOPs, policy documents, architecture guides, and technical documentation.

Finding the right information requires:

- Manual searching
- Reading multiple documents
- Switching between files
- Wasting valuable engineering time

Knowledge Nexus transforms static documentation into an intelligent AI assistant.

---

# ✨ Features

### 📄 Intelligent Document Ingestion

- PDF Upload
- Text Extraction
- Metadata Extraction
- Recursive Document Chunking
- Embedding Generation
- Automatic Indexing

---

### 🔍 Hybrid Search

Instead of relying on only vector search,

Knowledge Nexus combines

- Semantic Search (pgvector)
- Keyword Search (BM25)
- Result Re-ranking

to retrieve highly relevant document chunks.

---

### 🤖 AI Question Answering

Ask questions in plain English.

Example:

> Explain Kubernetes Pods

The assistant:

- searches relevant chunks
- builds context
- queries the LLM
- generates an accurate response

---

### 📚 Source Attribution

Every answer includes

- document name
- page number

allowing users to verify the response.

---

### 📊 Interactive Dashboard

- Total Documents
- Knowledge Chunks
- Knowledge Graph Nodes
- Relationships
- Chunk Distribution
- Documents Statistics

---

### 🕸 Knowledge Graph

Automatically visualizes extracted concepts and relationships between documents.

---

### 🌐 Modern UI

- Responsive
- Clean
- Fast
- Built using React + Tailwind + shadcn/ui

---

# 🏗 Architecture

```
React Frontend
        │
        ▼
 FastAPI Backend
        │
 ┌──────┴────────┐
 │               │
 ▼               ▼
Hybrid Search   Dashboard API
 │
 ▼
pgvector + PostgreSQL
 │
 ▼
Context Builder
 │
 ▼
OpenAI GPT
 │
 ▼
Answer + Sources
```

---

# ⚙ Technology Stack

## Frontend

- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Axios
- React Flow

---

## Backend

- FastAPI
- Python
- SQLAlchemy
- PostgreSQL
- pgvector
- Sentence Transformers
- PyPDF
- OpenAI API

---

## Search

- Semantic Search
- BM25
- Hybrid Retrieval

---

## AI

- OpenAI GPT
- Context Builder
- Prompt Engineering

---

## Infrastructure

- Docker
- Nginx
- AWS EC2
- Ubuntu
- Git

---

# 📂 Project Structure

```
Knowledge_Nexus/

├── backend/
│   ├── api/
│   ├── ingestion/
│   ├── llm/
│   ├── services/
│   ├── search/
│   ├── db/
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│   └── services/
│
├── docker-compose.yml
└── README.md
```

---

# 🔄 System Workflow

1. User uploads PDF

↓

2. Text Extraction

↓

3. Chunking

↓

4. Metadata Extraction

↓

5. Embedding Generation

↓

6. Store in PostgreSQL + pgvector

↓

7. User asks question

↓

8. Hybrid Search

↓

9. Retrieve Top Relevant Chunks

↓

10. Build Context

↓

11. Query OpenAI GPT

↓

12. Return Answer with Source Citations

---

# 📸 Screenshots

### Dashboard
<img width="1902" height="907" alt="dash" src="https://github.com/user-attachments/assets/3e3f4eb8-e3bb-4c20-8a59-b3ce19a9fb16" />


---

### Chat

<img width="1907" height="922" alt="chat" src="https://github.com/user-attachments/assets/557be627-2dcc-4736-93b8-68827a6743d4" />


---

### Upload

<img width="1900" height="900" alt="uplo" src="https://github.com/user-attachments/assets/471ab110-a799-4f70-9563-4eb93ae5e3b2" />


---

### Knowledge Graph

<img width="1907" height="911" alt="graph" src="https://github.com/user-attachments/assets/aeef7a2f-abe2-41fe-bf7e-8f70d6803fd8" />


---

# 🚀 Running Locally

## Clone Repository

```bash
git clone <repo-url>

cd Knowledge_Nexus
```

---

## Backend

```bash
cd backend

python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## PostgreSQL

```bash
docker compose up -d
```

---

# 🌍 Deployment

The application is deployed on:

- AWS EC2
- Nginx Reverse Proxy
- Docker (PostgreSQL)
- Uvicorn
- FastAPI

---

# 🎯 Demo Knowledge Base

The demo ships with a preloaded technical knowledge base including:

- Kubernetes for Beginners
- The Terraform Book
- Docker Tutorial

Users can immediately ask questions without uploading documents.

---

# 🔮 Future Enhancements

- Multi-user authentication
- Role Based Access Control
- S3 Document Storage
- Incremental Document Updates
- OCR Support
- Multi-format ingestion
- Conversation Memory
- Streaming Responses
- Multi-LLM Support
- Feedback & Rating System

---

# 👨‍💻 Team

Knowledge Nexus

Developed for the **IDBI Bank Hackathon 2026**

---

# 📜 License

MIT License
