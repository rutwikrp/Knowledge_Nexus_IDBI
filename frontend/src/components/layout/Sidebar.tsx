import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Upload,
    MessageSquare,
    Network
} from "lucide-react";

const items = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/"
    },
    {
        name: "Upload",
        icon: Upload,
        path: "/upload"
    },
    {
        name: "Chat",
        icon: MessageSquare,
        path: "/chat"
    },
    {
        name: "Knowledge Graph",
        icon: Network,
        path: "/graph"
    }
];

export default function Sidebar() {

    const location = useLocation();

    return (

        <aside className="w-64 border-r h-screen bg-white">

            <div className="p-6">

                <h1 className="text-2xl font-bold">
                    Knowledge Nexus
                </h1>

                <p className="text-sm text-gray-500">
                    Enterprise AI Platform
                </p>

            </div>

            <nav className="px-4">

                {items.map((item) => {

                    const Icon = item.icon;

                    return (

                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 rounded-lg p-3 mb-2 transition

                                ${
                                    location.pathname === item.path
                                        ? "bg-blue-600 text-white"
                                        : "hover:bg-gray-100"
                                }`}
                        >

                            <Icon size={18} />

                            {item.name}

                        </Link>

                    );

                })}

            </nav>

        </aside>

    );

}