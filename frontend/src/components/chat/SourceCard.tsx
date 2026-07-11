import type { Source } from "@/types/chat";
import { FileText } from "lucide-react";

interface Props {
    source: Source;
}

export default function SourceCard({ source }: Props) {
    return (
        <div className="mt-2 rounded-md border bg-slate-50 px-3 py-1.5">

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-2 min-w-0">
                    <FileText className="h-4 w-4 text-blue-600 shrink-0" />

                    <span className="truncate text-xs font-medium">
                        {source.document_name}
                    </span>
                </div>

                <span className="text-xs text-gray-500 whitespace-nowrap">
                    Pages {source.page_number}
                </span>

            </div>

        </div>
    );
}