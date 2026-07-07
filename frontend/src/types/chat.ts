export interface Source {

    id: string;

    document_name: string;

    page_number: number;

    rerank_score: number;

}

export interface ChatResponse {

    question: string;

    answer: string;

    sources: Source[];

}