import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface Props {

    value: string;

    onChange: (value: string) => void;

    onSend: () => void;

    loading: boolean;

}

export default function ChatInput({

    value,

    onChange,

    onSend,

    loading,

}: Props) {

    return (

        <div className="flex items-end gap-3">

            <Input
                className="h-14 rounded-xl text-base px-5"
                value={value}
                placeholder="Ask anything about your documents..."
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !loading) {
                        e.preventDefault();
                        onSend();
                    }
                }}
            />

            <Button
                className="h-14 px-7 rounded-xl"
                onClick={onSend}
                disabled={loading}
            >
                <Send className="mr-2 h-5 w-5" />
                Send
            </Button>

        </div>

    );

}