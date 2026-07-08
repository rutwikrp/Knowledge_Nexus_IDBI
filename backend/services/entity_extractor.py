import re
from itertools import combinations

KEYWORDS = [
    "Kubernetes",
    "Pod",
    "Deployment",
    "ReplicaSet",
    "Container",
    "Service",
    "Namespace",
    "Node",
    "Docker",
    "Terraform",
    "Module",
    "AWS",
]


class EntityExtractor:

    def extract(self, text):

        entities = []

        for word in KEYWORDS:
            if re.search(rf"\b{re.escape(word)}\b", text, re.IGNORECASE):
                entities.append(word)

        return list(set(entities))
    
def extract_edges(entities):

    edges = []

    for a, b in combinations(entities, 2):
        edges.append((a, b, "related"))

    return edges