from rank_bm25 import BM25Okapi
from nltk.tokenize import word_tokenize
from sqlalchemy import text

from db.session import engine


class BM25Searcher:

    def __init__(self):

        self.documents = []
        self.tokenized_docs = []
        self.bm25 = None

        self.build_index()

    def build_index(self):

        with engine.connect() as conn:

            result = conn.execute(
                text("""
                    SELECT
                        id,
                        content,
                        document_name,
                        page_number
                    FROM chunks
                """)
            )

            rows = result.fetchall()

        self.documents = [
            {
                "id": str(row.id),
                "content": row.content,
                "document_name": row.document_name,
                "page_number": row.page_number,
            }
            for row in rows
        ]

        self.tokenized_docs = [
            word_tokenize(doc["content"].lower())
            for doc in self.documents
        ]

        self.bm25 = BM25Okapi(self.tokenized_docs)

        print(f"BM25 indexed {len(rows)} chunks.")

    def search(self, query, top_k=10):

        query_tokens = word_tokenize(query.lower())

        scores = self.bm25.get_scores(query_tokens)

        ranked = sorted(
            zip(self.documents, scores),
            key=lambda x: x[1],
            reverse=True
        )

        return ranked[:top_k]