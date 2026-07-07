import KnowledgeGraph from "@/components/graph/KnowledgeGraph";

export default function Graph() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-6">
        <h1 className="text-4xl font-bold">
          Knowledge Graph
        </h1>

        <p className="text-muted-foreground">
          Explore relationships between concepts in your documents.
        </p>
      </div>

      <div className="flex-1 min-h-0">
        <KnowledgeGraph />
      </div>
    </div>
  );
}