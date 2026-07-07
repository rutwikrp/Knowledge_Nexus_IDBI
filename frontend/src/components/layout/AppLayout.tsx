import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppLayout() {

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="p-8 bg-slate-50 min-h-screen">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}