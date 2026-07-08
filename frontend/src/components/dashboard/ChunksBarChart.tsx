import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

export default function ChunksBarChart({ data }: any) {

    return (

        <ResponsiveContainer width="100%" height={320}>

            <BarChart data={data} margin={{ bottom: 20 }}>

                <XAxis dataKey="title" angle={-30}
                    textAnchor="end"
                    height={80}
                    interval={0}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) =>
                        {
                            const cleaned = value.replace(".pdf", "");
                            return cleaned.length > 18 ? cleaned.substring(0, 18) + "..." : cleaned;
                        }
                    }
                />

                <YAxis />

                <Tooltip />

                <Bar dataKey="chunks" fill="#6366f1" radius={[4, 4, 0, 0]}/>

            </BarChart>

        </ResponsiveContainer>

    );

}