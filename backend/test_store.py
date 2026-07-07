from sqlalchemy import text

from db.session import engine
from embeddings.embedding_service import get_embedding

sample_text = """
Kubernetes deployments are managed
using deployment.yaml files.
"""

embedding = get_embedding(sample_text)

vector = str(embedding)

with engine.begin() as conn:

    conn.execute(
        text("""
        INSERT INTO documents
        (title, source, team, version)

        VALUES
        ('sample', 'local', 'devops', '1.0')

        RETURNING id
        """)
    )

    doc_id = conn.execute(
        text("""
        SELECT MAX(id)
        FROM documents
        """)
    ).scalar()

    conn.execute(
        text("""
        INSERT INTO chunks
        (
            document_id,
            chunk_index,
            content,
            embedding
        )

        VALUES
        (
            :doc_id,
            :chunk_index,
            :content,
            :embedding
        )
        """),
        {
            "doc_id": doc_id,
            "chunk_index": 0,
            "content": sample_text,
            "embedding": vector
        }
    )

print("Stored successfully")