export interface Source {

    id: string;

    document_name: string;

    page_number: number | string;

    rerank_score: number;

}

export interface ChatMessage {

    id: string;

    role: "user" | "assistant";

    content: string;

    sources?: Source[];

}