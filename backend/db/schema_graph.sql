CREATE TABLE IF NOT EXISTS graph_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    type TEXT DEFAULT 'concept'
);

CREATE TABLE IF NOT EXISTS graph_edges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_node UUID REFERENCES graph_nodes(id) ON DELETE CASCADE,
    target_node UUID REFERENCES graph_nodes(id) ON DELETE CASCADE,
    relation TEXT
);