from retrieval.pipeline import retrieve
from llm.prompt_builder import PromptBuilder

query = "What is a Terraform module?"

results = retrieve(query)

prompt = PromptBuilder.build(
    query,
    results
)

print(prompt)