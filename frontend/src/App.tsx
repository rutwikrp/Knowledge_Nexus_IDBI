import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "@/components/layout/AppLayout";

import Dashboard from "@/pages/Dashboard";
import Upload from "@/pages/Upload";
import Chat from "@/pages/Chat";
import Graph from "@/pages/Graph";

// function App() {
//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>Hello Knowledge Nexus</h1>
//     </div>
//   );
// }

// export default App;
export default function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route element={<AppLayout />}>

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/upload"
                        element={<Upload />}
                    />

                    <Route
                        path="/chat"
                        element={<Chat />}
                    />

                    <Route
                        path="/graph"
                        element={<Graph />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}