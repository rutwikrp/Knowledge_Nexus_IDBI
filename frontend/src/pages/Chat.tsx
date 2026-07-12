import { useState } from "react";
import ChatInput from "@/components/chat/ChatInput";
import { askQuestion } from "@/services/chatService";
import type { ChatMessage } from "@/types/chat";
import ChatWindow from "@/components/chat/ChatWindow";

export default function Chat() {

    const [question, setQuestion] = useState("");

    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    async function handleSend() {

        if (!question.trim()) return;

        const thinkingId =  `thinking-${Date.now()}`;
        const userMessage: ChatMessage = {

            id: `user-${Date.now()}`,

            role: "user",

            content: question,

        };

        setMessages((prev) => [...prev, userMessage, {
            id: thinkingId,
            role: "assistant",
            content: "Thinking..."
        }]);

        const currentQuestion = question;

        setQuestion("");

        setLoading(true);

        try {

            const response = await askQuestion(currentQuestion);

            

            setMessages(prev =>
                prev.map(message =>
                    message.id === thinkingId
                        ? {
                            ...message,
                            content: response.answer,
                            sources: response.sources,
                        }
                        : message
                )
            );

        } finally {

            setLoading(false);

        }

    }

    return (
        <div className="flex h-full flex-col">

            <div className="shrink-0 pb-5">

                <h1 className="text-4xl font-bold">
                    AI Knowledge Assistant
                </h1>

                <p className="mt-2 text-gray-500">
                    Ask questions about your uploaded documents.
                </p>

            </div>

            <div className="flex-1 overflow-hidden">

                <ChatWindow messages={messages} />

            </div>

            <div className="shrink-0 border-t bg-white px-6 py-5">

                <ChatInput
                    value={question}
                    onChange={setQuestion}
                    onSend={handleSend}
                    loading={loading}
                />

            </div>

        </div>
    );
}