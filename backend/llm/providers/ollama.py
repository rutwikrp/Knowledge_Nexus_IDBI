from ollama import chat


class OllamaProvider:

    def __init__(self,
                 model="qwen3:8b",
                 temperature=0):

        self.model = model
        self.temperature = temperature

    def generate(self, prompt):

        response = chat(
            model=self.model,
            messages=[
                {
                    "role": "system",
                    "content":
                    "You are an Enterprise AI Knowledge Assistant."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            options={
                "temperature": self.temperature
            }
        )

        return response["message"]["content"]