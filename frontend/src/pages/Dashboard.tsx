import {
    FileText,
    Database,
    Network,
    Share2,
} from "lucide-react";

import { useEffect, useState } from "react";

import { getDashboardStats } from "@/services/dashboardService";

import StatCard from "@/components/dashboard/StatCard";
import ChunkDistributionChart from "@/components/dashboard/ChunkDistributionChart";
import ChunksBarChart from "@/components/dashboard/ChunksBarChart";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Dashboard() {

    const [stats, setStats] = useState<any>(null);

    useEffect(() => {

        async function loadDashboard() {
            const data = await getDashboardStats();
            setStats(data);
        }

        loadDashboard();

    }, []);

    if (!stats) {
        return (
            <div className="p-10">
                Loading dashboard...
            </div>
        );
    }

    return (
        <>

            <div className="mb-4">

                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="text-gray-500">
                    Knowledge Base Overview
                </p>

            </div>

            <div className="grid grid-cols-4 gap-4">

                <StatCard
                    title="Documents"
                    value={stats.documents}
                    icon={FileText}
                />

                <StatCard
                    title="Knowledge Chunks"
                    value={stats.chunks}
                    icon={Database}
                />

                <StatCard
                    title="Knowledge Nodes"
                    value={stats.nodes}
                    icon={Network}
                />

                <StatCard
                    title="Relationships"
                    value={stats.edges}
                    icon={Share2}
                />

            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">

                <Card>

                    <CardHeader className="pb-2">

                        <CardTitle className="text-base">
                            Chunk Distribution
                        </CardTitle>

                    </CardHeader>

                    <CardContent className="h-[180px]">

                        <ChunkDistributionChart
                            data={stats.distribution}
                        />

                    </CardContent>

                </Card>

                <Card>

                    <CardHeader className="pb-2">

                        <CardTitle className="text-base">
                            Chunks per Document
                        </CardTitle>

                    </CardHeader>

                    <CardContent className="h-[180px]">

                        <ChunksBarChart
                            data={stats.distribution}
                        />

                    </CardContent>

                </Card>

            </div>

            <Card className="mt-4">

                <CardHeader>
                    <CardTitle>
                        Recent Documents
                    </CardTitle>
                </CardHeader>

                <CardContent>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left py-2">
                                    Document
                                </th>

                                <th className="text-right py-2">
                                    Chunks
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {stats.recent_documents.map((doc: any) => (

                                <tr
                                    key={doc.id}
                                    className="border-b"
                                >

                                    <td className="py-3">
                                        {doc.title}
                                    </td>

                                    <td className="text-right">
                                        {doc.chunks}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </CardContent>

            </Card>

        </>
    );
}