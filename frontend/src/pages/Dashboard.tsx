import {
    FileText,
    Database,
    MessageSquare,
    Network
} from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";

export default function Dashboard() {

    return (

        <>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Dashboard

                </h1>

                <p className="text-gray-500">

                    Enterprise AI Knowledge Platform

                </p>

            </div>

            <div className="grid grid-cols-4 gap-6">

                <StatCard
                    title="Documents"
                    value={1}
                    icon={FileText}
                />

                <StatCard
                    title="Knowledge Chunks"
                    value={134}
                    icon={Database}
                />

                <StatCard
                    title="Questions Asked"
                    value={0}
                    icon={MessageSquare}
                />

                <StatCard
                    title="Knowledge Nodes"
                    value={0}
                    icon={Network}
                />

            </div>

        </>

    );

}