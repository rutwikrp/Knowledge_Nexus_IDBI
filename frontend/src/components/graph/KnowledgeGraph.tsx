import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
} from "reactflow";

import "reactflow/dist/style.css";
import { useEffect, useState, useMemo } from "react";
import { fetchGraph } from "@/api/graphService";

interface Props {
  onNodeSelect?: (node: any) => void;
}
export default function KnowledgeGraph({ onNodeSelect, }: Props) {

  const [rawNodes, setRawNodes] = useState<Node[]>([]);
  const [rawEdges, setRawEdges] = useState<Edge[]>([]);
  const [search, setSearch] = useState("");

  async function loadGraph(query = "") {
    try {
      const graph = await fetchGraph(query);

      setRawNodes(
        graph.nodes.map((node: any) => ({
          id: node.id,
          data: {
            label: node.label,
            type: node.type,
          },
          position: {
            x: Math.random() * 700,
            y: Math.random() * 500,
          },
        }))
      );

      setRawEdges(
        graph.edges.map((edge: any, index: number) => ({
          id: `${edge.source}-${edge.target}-${index}`,
          source: edge.source,
          target: edge.target,
          label: edge.label,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  }
    useEffect(() => {
      loadGraph();
    }, []);
    useEffect(() => {
      const timer = setTimeout(() => {
          loadGraph(search);
      }, 400);

      return () => clearTimeout(timer);
  }, [search]);
  
  const nodes = useMemo(() => {

    return rawNodes.map((node) => {

      const selected =
        search.length > 0 &&
        String(node.data.label)
          .toLowerCase()
          .includes(search.toLowerCase());

      return {

        ...node,

        style: {

          background: selected
            ? "#2563eb"
            : "#ffffff",

          color: selected
            ? "#ffffff"
            : "#000000",

          border: selected
            ? "3px solid #2563eb"
            : "1px solid #d1d5db",

          borderRadius: 10,

          padding: 10,

        },

      };

    });

  }, [rawNodes, search]);
  const edges = useMemo(() => {

    return rawEdges.map((edge) => {

      const source = rawNodes.find(
        n => n.id === edge.source
      );

      const target = rawNodes.find(
        n => n.id === edge.target
      );

      const highlight =
        search.length > 0 &&
        (
          String(source?.data.label)
            .toLowerCase()
            .includes(search.toLowerCase())

          ||

          String(target?.data.label)
            .toLowerCase()
            .includes(search.toLowerCase())
        );

      return {

        ...edge,

        animated: highlight,

        style: {

          stroke: highlight
            ? "#2563eb"
            : "#94a3b8",

          strokeWidth: highlight
            ? 3
            : 1,

        },

      };

    });

  }, [rawEdges, rawNodes, search]);
  return (
    <div className="w-full">
      <div className="mb-4">

          <input
              type="text"
              placeholder="🔍 Search concepts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border p-3"
          />

      </div>
      
      <div className="h-[650px] w-full rounded-xl border bg-white">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={(_, node) => onNodeSelect?.(node)}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background gap={18} />
        </ReactFlow>
      </div>
    </div>
  );
}