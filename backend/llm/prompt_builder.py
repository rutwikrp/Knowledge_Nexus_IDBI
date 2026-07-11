from typing import List


class PromptBuilder:

    SYSTEM_PROMPT = """
You are an Enterprise AI Knowledge Assistant.

Instructions:

- Answer ONLY using the provided context.
- Do not invent information.
- If the answer cannot be found, reply:
  "I couldn't find this information in the provided documents."
- If multiple documents disagree, mention each viewpoint.
- Answer in natural language.
- Do NOT include document names, page numbers, citations, or references in the answer.
- The application will display source citations separately.
"""

    @staticmethod
    def build(question: str, retrieved_chunks: List):

        context = []

        for chunk, score in retrieved_chunks:

            context.append(
                f"""
Document : {chunk["document_name"]}
Page     : {chunk["page_number"]}
Score    : {float(score):.2f}

Content:
{chunk["content"]}
"""
            )

        context = "\n\n---------------------------\n\n".join(context)

        prompt = f"""
{PromptBuilder.SYSTEM_PROMPT}

================ CONTEXT ================

{context}

=========================================

Question:

{question}

Answer:
"""

        return prompt