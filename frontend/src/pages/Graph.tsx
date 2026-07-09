import { useState } from "react";
import KnowledgeGraph from "@/components/graph/KnowledgeGraph";
import NodeDetails from "@/components/graph/NodeDetails";

export default function Graph() {
  const [selectedNode, setSelectedNode] = useState<any>(null);

  return (
    <div className="flex gap-6 h-[760px]">

      <div className="flex-1">
        <KnowledgeGraph onNodeSelect={setSelectedNode} />
      </div>

      <div className="w-80 shrink-0">
        <NodeDetails node={selectedNode} />
      </div>

    </div>
  );
}