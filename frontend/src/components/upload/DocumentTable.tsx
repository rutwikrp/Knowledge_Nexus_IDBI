import {
    Card,
    CardContent,
} from "@/components/ui/card";

const documents = [

    {
        name: "Kubernetes-for-Beginners.pdf",
        chunks: 134,
        status: "Indexed",
    },

];

export default function DocumentTable() {

    return (

        <Card className="mt-8">

            <CardContent className="p-6">

                <h2 className="text-xl font-semibold mb-6">

                    Uploaded Documents

                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="text-left border-b">

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
                                key={doc.name}
                                className="border-b h-14"
                            >

                                <td>

                                    {doc.name}

                                </td>

                                <td>

                                    {doc.chunks}

                                </td>

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