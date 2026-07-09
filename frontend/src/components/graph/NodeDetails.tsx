interface Props {
  node: any;
}

export default function NodeDetails({ node }: Props) {

  if (!node) {
    return (
      <div className="border rounded-lg p-6 bg-white">
        Select a node to view details.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow h-full">

      {!node ? (
        <>
          <h2 className="text-lg font-semibold mb-4">
            Node Details
          </h2>

          <p className="text-gray-500">
            Select a node to inspect its information.
          </p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">
            {node.data.label}
          </h2>

          <div className="space-y-3">

            <div>
              <span className="font-semibold">Type</span>
              <p>{node.data.type}</p>
            </div>

            <div>
              <span className="font-semibold">Node ID</span>
              <p className="break-all text-sm text-gray-500">
                {node.id}
              </p>
            </div>

          </div>
        </>
      )}

    </div>
  );
}