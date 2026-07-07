import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getDocuments } from "@/services/documentService";

interface Document {
    id: string;
    title: string;
    chunks: number;
    status: string;
}

export default function DocumentTable() {

    const [documents, setDocuments] = useState<Document[]>([]);

    async function loadDocuments() {
        try {
            const data = await getDocuments();
            setDocuments(data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        loadDocuments();
    }, []);

    return (
        <Card className="mt-8">

            <CardContent className="p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Uploaded Documents
                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="border-b text-left">

                            <th className="pb-3">
                                Document
                            </th>

                            <th>
                                Chunks
                            </th>

                            <th>
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {documents.map((doc) => (

                            <tr
                                key={doc.id}
                                className="border-b h-14"
                            >

                                <td>{doc.title}</td>

                                <td>{doc.chunks}</td>

                                <td className="text-green-600">
                                    ✓ {doc.status}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </CardContent>

        </Card>
    );
}