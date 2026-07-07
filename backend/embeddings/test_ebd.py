from embedding_service import get_embedding

vec = get_embedding("hello world")

print(len(vec))