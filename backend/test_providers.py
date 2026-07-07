from llm.response_generator import generate_response

query = "What is a Terraform module?"

answer = generate_response(query)

print(answer)