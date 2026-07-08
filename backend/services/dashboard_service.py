from sqlalchemy import text
from db.session import SessionLocal


class DashboardService:

    def get_stats(self):
        db = SessionLocal()

        documents = db.execute(
            text("SELECT COUNT(*) FROM documents")
        ).scalar()

        chunks = db.execute(
            text("SELECT COUNT(*) FROM chunks")
        ).scalar()

        nodes = db.execute(
            text("SELECT COUNT(*) FROM graph_nodes")
        ).scalar()

        edges = db.execute(
            text("SELECT COUNT(*) FROM graph_edges")
        ).scalar()

        recent = db.execute(
            text("""
                SELECT
                    d.title,
                    COUNT(c.id) AS chunks
                FROM documents d
                LEFT JOIN chunks c
                    ON d.id=c.document_id
                GROUP BY d.id
                ORDER BY d.id DESC
                LIMIT 5
            """)
        ).mappings().all()

        distribution = db.execute(
            text("""
                SELECT
                    d.title,
                    COUNT(c.id) AS chunks
                FROM documents d
                JOIN chunks c
                    ON d.id=c.document_id
                GROUP BY d.id
            """)
        ).mappings().all()

        db.close()

        return {
            "documents": documents,
            "chunks": chunks,
            "nodes": nodes,
            "edges": edges,
            "recent_documents": recent,
            "distribution": distribution,
        }