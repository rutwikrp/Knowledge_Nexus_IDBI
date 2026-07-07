import type { ChatMessage } from "@/types/chat";
import { User, Bot } from "lucide-react";

interface Props {
    message: ChatMessage;
}

export default function ChatBubble({ message }: Props) {

    const isUser = message.role === "user";

    return (

        <div
            className={`flex gap-4 mb-6 ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >

            {!isUser && (
                <Bot className="w-8 h-8 mt-1 text-blue-600" />
            )}

            <div
                className={`rounded-xl px-5 py-4 max-w-[70%] shadow-sm ${
                    isUser
                        ? "bg-blue-600 text-white"
                        : "bg-white border"
                }`}
            >

                <p className="whitespace-pre-wrap">
                    {message.content}
                </p>

            </div>

            {isUser && (
                <User className="w-8 h-8 mt-1 text-gray-700" />
            )}

        </div>

    );

}