from db.session  import SessionLocal
from db.session import DATABASE_URL
from sqlalchemy import text


class GraphService:

    def __init__(self):
        self.db = SessionLocal()

    def add_node(self, name: str):

        try:
            print(DATABASE_URL)
            print("ADDING NODE:", name)

            self.db.execute(
                text("""
                    INSERT INTO graph_nodes(name)
                    VALUES (:name)
                    ON CONFLICT(name) DO NOTHING
                """),
                {"name": name}
            )

            self.db.commit()
            count = self.db.execute(
                text("SELECT COUNT(*) FROM graph_nodes")
                ).scalar()

            print(f"NODE COUNT: {count}")

        except SQLAlchemyError as e:
            self.db.rollback()
            print("GRAPH ERROR:", e)
        except Exception as e:
            self.db.rollback()
            print("UNKNOWN ERROR:", e)

    def add_edge(self, source, target, relation):

        self.db.execute(
            text("""
            INSERT INTO graph_edges(source_node,target_node,relation)

            VALUES(
                (SELECT id FROM graph_nodes WHERE name=:source),
                (SELECT id FROM graph_nodes WHERE name=:target),
                :relation
            )
            """),
            {
                "source": source,
                "target": target,
                "relation": relation
            }
        )

        self.db.commit()
    
    def get_graph(self):

        nodes = self.db.execute(
            text("""
                SELECT
                    id,
                    name,
                    type
                FROM graph_nodes
            """)
        ).mappings().all()

        edges = self.db.execute(
            text("""
                SELECT
                    e.id,
                    s.name AS source,
                    t.name AS target,
                    e.relation
                FROM graph_edges e
                JOIN graph_nodes s
                    ON e.source_node = s.id
                JOIN graph_nodes t
                    ON e.target_node = t.id
            """)
        ).mappings().all()

        return {
            "nodes": [
                {
                    "id": str(node["id"]),
                    "label": node["name"],
                    "type": node["type"],
                }
                for node in nodes
            ],
            "edges": [
                {
                    "id": str(edge["id"]),
                    "source": edge["source"],
                    "target": edge["target"],
                    "label": edge["relation"],
                }
                for edge in edges
            ],
        }