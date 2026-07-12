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
                    <div className="mt-1 rounded-xl border bg-blue-50 border-blue-200 p-2">
                        <h3 className="text-sm font-semibold text-blue-900">
                            Demo Knowledge Base
                        </h3>

                        <p className="mt-2 text-sm text-gray-700">
                            This demo already contains a curated knowledge base.
                            You can start asking questions immediately without uploading any documents.
                        </p>

                        <div className="mt-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                                Preloaded Documents
                            </p>

                            <div className="mt-4 space-y-1 text-sm text-gray-800">
                                <div>📘 Kubernetes for Beginners</div>
                                <div>📗 The Terraform Book</div>
                                <div>📙 Docker Tutorial</div>
                                </div>
                        </div>
                        </div>
                    <div className="mt-7 space-y-3">

                        <div className="rounded-xl border bg-white px-5 py-3">
                            💡 Compare Docker and Kubernetes
                        </div>

                        <div className="rounded-xl border bg-white px-5 py-3">
                            💡 Explain Terraform Modules
                        </div>

                        <div className="rounded-xl border bg-white px-5 py-3">
                            💡 What is a Kubernetes Pod?

                        </div>

                        <div className="rounded-xl border bg-white px-5 py-3">
                            💡 How do Kubernetes Services communicate with Pods?
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