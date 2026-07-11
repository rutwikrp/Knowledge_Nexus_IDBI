import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#7c3aed",
    "#06b6d4"
];

export default function ChunkDistributionChart({ data }: any) {

    return (

        <ResponsiveContainer width="100%" height={180}>

            <PieChart>

                <Pie
                    data={data}
                    dataKey="chunks"
                    nameKey="title"
                    outerRadius={65}
                    label={false}
                >

                    {data.map((_: any, index: number) => (

                        <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                        />

                    ))}

                </Pie>

                <Tooltip />

            </PieChart>

        </ResponsiveContainer>

    );

}