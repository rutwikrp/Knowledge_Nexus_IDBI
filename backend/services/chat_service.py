from llm.response_generator import ResponseGenerator
class ChatService:

    def __init__(self):
        self.generator = ResponseGenerator()

    def ask(self, question: str):
        return self.generator.generate(question)