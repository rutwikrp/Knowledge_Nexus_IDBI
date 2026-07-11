import type { ChatMessage } from "@/types/chat";
import { User, Bot } from "lucide-react";
import SourcesList from "./SourcesList";

interface Props {
    message: ChatMessage;
}

export default function ChatBubble({ message }: Props) {

    const isUser = message.role === "user";
    const isThinking =
        message.role === "assistant" &&
        message.content === "Thinking...";

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

                {isThinking ? (
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" />
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce delay-150" />
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce delay-300" />
                        <span className="text-gray-500 ml-2">
                            Thinking...
                        </span>
                    </div>
                ) : (
                    <>
                        <p className="whitespace-pre-wrap">
                            {message.content}
                        </p>
                    
                        {message.sources && message.sources.length > 0 && (

                            <div className="mt-5 border-t pt-4">

                                <SourcesList sources={message.sources} />

                            </div>

                        )}
                    </>
                )}

            </div>

            {isUser && (
                <User className="w-8 h-8 mt-1 text-gray-700" />
            )}

        </div>

    );

}