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
            className="h-full overflow-y-auto px-6 py-6"
        >

            {messages.length === 0 ? (

                <div className="flex h-full flex-col items-center justify-center text-center">

                    <h2 className="text-3xl font-bold">
                        AI Knowledge Assistant
                    </h2>

                    <p className="mt-3 text-gray-500 max-w-xl">
                        Ask questions about your uploaded documents using semantic search,
                        hybrid retrieval and AI.
                    </p>

                    <div className="mt-10 space-y-3">

                        <div className="rounded-xl border bg-white px-5 py-3">
                            💡 Explain Kubernetes Pods
                        </div>

                        <div className="rounded-xl border bg-white px-5 py-3">
                            💡 What is Terraform?
                        </div>

                        <div className="rounded-xl border bg-white px-5 py-3">
                            💡 Compare Docker Containers and Kubernetes Pods
                        </div>

                        <div className="rounded-xl border bg-white px-5 py-3">
                            💡 Explain AWS VPC
                        </div>

                    </div>

                </div>

            ) : (

                <div className="space-y-8">

                    {messages.map((message) => (

                        <ChatBubble
                            key={message.id}
                            message={message}
                        />

                    ))}

                </div>

            )}

        </div>
    );
}