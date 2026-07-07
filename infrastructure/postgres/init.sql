CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pgcrypto;


CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    source TEXT,
    team TEXT,
    version TEXT,
    uploaded_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    document_id UUID
        REFERENCES documents(id)
        ON DELETE CASCADE,

    chunk_index INTEGER,

    content TEXT,

    embedding VECTOR(384),

    document_name TEXT,

    page_number INTEGER
);

CREATE INDEX idx_chunks_document
ON chunks(document_id);

CREATE INDEX idx_chunks_page
ON chunks(page_number);