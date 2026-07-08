import json
import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


class LLMGraphExtractor:

    def extract(self, chunk: str):

        prompt = f"""
Extract important technical entities and relationships.

Return ONLY valid JSON.

Example:

{{
    "entities":[
        {{
            "name":"Deployment",
            "type":"Resource"
        }}
    ],

    "relationships":[
        {{
            "source":"Deployment",
            "target":"ReplicaSet",
            "relation":"manages"
        }}
    ]
}}

Text:

{chunk}
"""

        response = client.chat.completions.create(
            model="gpt-4.1-nano",
            temperature=0,
            response_format={"type": "json_object"},
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return json.loads(
            response.choices[0].message.content
        )