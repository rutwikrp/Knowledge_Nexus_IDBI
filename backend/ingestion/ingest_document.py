import os

from sqlalchemy import text

from db.session import engine

from ingestion.pdf_loader import extract_pdf_text
from ingestion.chunker import chunk_text

from embeddings.embedding_service import get_embedding
from services.graph_service import GraphService
from services.entity_extractor import EntityExtractor, extract_edges




def ingest_pdf(pdf_path):
    graph_service = GraphService()
    extractor = EntityExtractor()

    filename = os.path.basename(pdf_path)

    pages = extract_pdf_text(pdf_path)

    with engine.begin() as conn:

        document_id = conn.execute(
            text("""
                INSERT INTO documents
                (
                    title,
                    source,
                    team,
                    version
                )
                VALUES
                (
                    :title,
                    'local',
                    'devops',
                    '1.0'
                )
                RETURNING id
            """),
            {
                "title": filename
            }
        ).scalar()

        total_chunks = 0

        for page in pages:

            page_number = page["page_number"]

            page_text = page["text"]

            if len(page_text.strip()) < 100:
                continue

            chunks = chunk_text(page_text)
            print(
                f"Page {page_number}: "
                f"{len(page_text)} chars -> "
                f"{len(chunks)} chunks"
            )
            for chunk_index, chunk in enumerate(chunks):

                embedding = get_embedding(chunk)

                conn.execute(
                    text("""
                        INSERT INTO chunks
                        (
                            document_id,
                            chunk_index,
                            content,
                            embedding,
                            document_name,
                            page_number
                        )
                        VALUES
                        (
                            :document_id,
                            :chunk_index,
                            :content,
                            :embedding,
                            :document_name,
                            :page_number
                        )
                    """),
                    {
                        "document_id": document_id,
                        "chunk_index": chunk_index,
                        "content": chunk,
                        "embedding": str(embedding),
                        "document_name": filename,
                        "page_number": page_number
                    }
                )

                total_chunks += 1
                entities = extractor.extract(chunk)
                print("ENTITIES:", entities)

                for entity in entities:
                    graph_service.add_node(entity)

                edges = extract_edges(entities)
                print("EDGES:", edges)

                for source, target, relation in edges:
                    graph_service.add_edge(source, target, relation)
    print(
        f"Stored {total_chunks} chunks from {filename}"    
    )
    return {
        "success": True,
        "message": "Document uploaded successfully",
        "filename": filename,
        "chunks": total_chunks,
    }


if __name__ == "__main__":

    ingest_pdf("TheTerraformBook_sample.pdf")