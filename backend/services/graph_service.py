from db.session  import SessionLocal
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

class GraphService:

    def __init__(self):
        self.db = SessionLocal()

    def add_node(self, name: str, type: str):

        try:
            
            

            self.db.execute(
                text("""
                    INSERT INTO graph_nodes(name,type)
                    VALUES (:name, :type)
                    ON CONFLICT(name) DO NOTHING
                """),
                {"name": name, "type": type}
            )


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
            ON CONFLICT DO NOTHING
            """),
            {
                "source": source,
                "target": target,
                "relation": relation
            }
        )

    def get_graph(self, query=None):

        if query:

            node = self.db.execute(
                text("""
                    SELECT id, name, type
                    FROM graph_nodes
                    WHERE LOWER(name) LIKE LOWER(:name)
                    LIMIT 1
                """),
                {
                    "name": f"%{query}%"
                }
            ).mappings().first()

            if node is None:
                return {
                    "nodes": [],
                    "edges": []
                }

            rows = self.db.execute(
                text("""
                    SELECT
                        s.id   AS source_id,
                        s.name AS source_name,
                        s.type AS source_type,

                        t.id   AS target_id,
                        t.name AS target_name,
                        t.type AS target_type,

                        e.relation

                    FROM graph_edges e

                    JOIN graph_nodes s
                        ON e.source_node = s.id

                    JOIN graph_nodes t
                        ON e.target_node = t.id

                    WHERE
                        s.id = :id
                        OR
                        t.id = :id
                    LIMIT 25
                """),
                {
                    "id": node["id"]
                }
            ).mappings().all()

        else:

            rows = self.db.execute(
                text("""
                    SELECT
                        s.id   AS source_id,
                        s.name AS source_name,
                        s.type AS source_type,

                        t.id   AS target_id,
                        t.name AS target_name,
                        t.type AS target_type,

                        e.relation

                    FROM graph_edges e

                    JOIN graph_nodes s
                        ON e.source_node = s.id

                    JOIN graph_nodes t
                        ON e.target_node = t.id

                    LIMIT 300
                """)
            ).mappings().all()

        nodes = {}
        edges = []

        for row in rows:

            IGNORE = {
                "tf",
                "tfvars",
                "var",
                "=",
                "==",
                ">",
                "<",
                ">=",
                "<=",
                "!=",
                ".terraform",
                "awscli",
                "web.tf",
                "main.tf",
                "variables.tf",
                "outputs.tf",
                "provider.tf",
            }

            if row["source_name"].lower() in IGNORE:
                continue

            if row["target_name"].lower() in IGNORE:
                continue

            if len(row["source_name"]) < 3:
                continue

            if len(row["target_name"]) < 3:
                continue
            nodes[row["source_id"]] = {
                "id": row["source_id"],
                "label": row["source_name"],
                "type": row["source_type"],
            }

            nodes[row["target_id"]] = {
                "id": row["target_id"],
                "label": row["target_name"],
                "type": row["target_type"],
            }

            edges.append({
                "id": f'{row["source_id"]}-{row["target_id"]}',
                "source": row["source_id"],
                "target": row["target_id"],
                "label": row["relation"],
            })

        return {
            "nodes": list(nodes.values()),
            "edges": edges,
        }