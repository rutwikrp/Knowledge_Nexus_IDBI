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

        <ResponsiveContainer width="100%" height={180} >

            <BarChart data={data} margin={{ bottom: 20 }} barCategoryGap="35%">

                <XAxis dataKey="title" angle={-30}
                    textAnchor="end"
                    height={50}
                    interval={0}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) =>
                        {
                            const cleaned = value.replace(".pdf", "");
                            return cleaned.length > 14 ? cleaned.substring(0, 18) + "..." : cleaned;
                        }
                    }
                />

                <YAxis tick={{ fontSize: 11 }} width={30}/>

                <Tooltip />

                <Bar dataKey="chunks" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={40}/>

            </BarChart>

        </ResponsiveContainer>

    );

}