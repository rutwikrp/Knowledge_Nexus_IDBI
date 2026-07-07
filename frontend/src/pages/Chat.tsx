import { useState } from "react";
import ChatInput from "@/components/chat/ChatInput";
import { askQuestion } from "@/services/chatService";

export default function Chat() {

    const [question, setQuestion] = useState("");

    const [loading, setLoading] = useState(false);

    const [answer, setAnswer] = useState("");

    async function handleSend() {

        if (!question.trim()) return;

        setLoading(true);

        try {

            const response = await askQuestion(question);

            setAnswer(response.answer);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold">

                    AI Knowledge Assistant

                </h1>

                <p className="text-gray-500">

                    Ask questions about your uploaded documents.

                </p>

            </div>

            <ChatInput

                value={question}

                onChange={setQuestion}

                onSend={handleSend}

                loading={loading}

            />

            {answer && (

                <div className="rounded-lg border p-6 whitespace-pre-wrap">

                    {answer}

                </div>

            )}

        </div>

    );

}