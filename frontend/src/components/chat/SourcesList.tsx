import SourceCard from "./SourceCard";
import type { Source } from "@/types/chat";

interface Props {
    sources: Source[];
}

export default function SourcesList({ sources }: Props) {
    if (!sources.length) return null;

    // Group sources by document
    const grouped = sources.reduce<Record<string, Source[]>>((acc, source) => {
        if (!acc[source.document_name]) {
            acc[source.document_name] = [];
        }
        acc[source.document_name].push(source);
        return acc;
    }, {});

    return (
        <div className="mt-4">
            <h4 className="mb-2 text-sm font-semibold text-gray-600">
                Sources
            </h4>

            <div className="space-y-2">
                {Object.entries(grouped).map(([document, docs]) => (
                    <SourceCard
                        key={document}
                        source={{
                            ...docs[0],
                            page_number: docs
                                .map((s) => s.page_number)
                                .sort((a: any, b: any) => Number(a) - Number(b))
                                .join(" • "),
                        }}
                    />
                ))}
            </div>
        </div>
    );
}