import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/types/chat";
import ChatBubble from "./ChatBubble";

interface Props {
    messages: ChatMessage[];
}

export default function ChatWindow({ messages }: Props) {

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const container = containerRef.current;

        if (!container) return;

        container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
        });

    }, [messages]);

    return (

        <div
            ref={containerRef}
            className="h-full overflow-y-auto px-6 py-6 space-y-8"
        >

            {messages.map((message) => (

                <ChatBubble
                    key={message.id}
                    message={message}
                />

            ))}

        </div>

    );
}