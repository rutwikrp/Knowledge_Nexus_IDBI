from sqlalchemy import create_engine

DATABASE_URL = (
    "postgresql://admin:admin@localhost:5432/knowledge"
)

engine = create_engine(DATABASE_URL)