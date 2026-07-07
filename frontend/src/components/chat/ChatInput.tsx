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

        <div className="flex gap-4">

            <Input
                value={value}
                placeholder="Ask anything about your documents..."
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !loading) {
                        onSend();
                    }
                }}
            />

            <Button

                onClick={onSend}

                disabled={loading}

            >

                <Send className="w-4 h-4 mr-2" />

                Send

            </Button>

        </div>

    );

}