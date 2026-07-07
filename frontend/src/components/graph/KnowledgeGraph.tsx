import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
} from "reactflow";

import "reactflow/dist/style.css";
import { useEffect, useState } from "react";
import { fetchGraph } from "@/api/graphService";

export default function KnowledgeGraph() {

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    async function loadGraph() {
      try {
        const graph = await fetchGraph();

        setNodes(
          graph.nodes.map((node: any) => ({
            id: node.id,
            data: { label: node.label },
            position: {
              x: Math.random() * 700,
              y: Math.random() * 500,
            },
          }))
        );

        setEdges(
          graph.edges.map((edge: any) => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            label: edge.label,
          }))
        );
      } catch (err) {
        console.error(err);
      }
    }

    loadGraph();
  }, []);

  return (
    <div className="h-full w-full rounded-xl border bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background gap={18} />
      </ReactFlow>
    </div>
  );
}