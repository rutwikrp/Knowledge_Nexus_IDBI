import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: number | string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
}: Props) {
  return (
    <Card>
      <CardContent className="flex justify-between items-center py-4 px-5">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-2xl font-bold mt-1">
            {value}
          </h2>

        </div>

        <Icon
          className="text-blue-600"
          size={28}
        />

      </CardContent>
    </Card>
  );
}