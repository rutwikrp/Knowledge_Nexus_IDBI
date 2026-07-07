from sqlalchemy import text

from db.session import engine
from embeddings.embedding_service import get_embedding


def search(query, top_k=5):

    query_embedding = get_embedding(query)

    with engine.connect() as conn:

        result = conn.execute(
            text("""
                SELECT
                    id,
                    content,
                    document_name,
                    page_number,
                    embedding <=> CAST(:embedding AS vector)
                    AS distance

                FROM chunks

                ORDER BY distance

                LIMIT :top_k
            """),
            {
                "embedding": str(query_embedding),
                "top_k": top_k
            }
        )

        rows = result.fetchall()

        return [
            {
                "id": str(row.id),
                "content": row.content,
                "document_name": row.document_name,
                "page_number": row.page_number,
                "distance": float(row.distance),
            }
            for row in rows
        ]