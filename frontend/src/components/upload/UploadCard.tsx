import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface Props {
    selectedFile: File | null;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onUpload: () => void;
    uploading: boolean;
}

export default function UploadCard({
    selectedFile,
    onFileChange,
    onUpload,
    uploading,
}: Props) {
    return (
        <Card>

            <CardContent className="p-5">

                <div className="border-2 border-dashed rounded-xl p-6 text-center">

                    <Upload
                        size={32}
                        className="mx-auto mb-2 text-blue-600"
                    />

                    <h2 className="text-xl font-semibold">

                        Upload PDF

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Drag & Drop or Browse Files

                    </p>

                    <input
                        type="file"
                        accept=".pdf"
                        className="mt-6"
                        onChange={onFileChange}
                    />

                    {selectedFile && (

                        <p className="mt-4">

                            {selectedFile.name}

                        </p>

                    )}

                    <Button
                        disabled={uploading}
                        onClick={onUpload}
                        className="mt-6"
                    >

                        {uploading
                            ? "Uploading..."
                            : "Upload Document"}

                    </Button>

                </div>

            </CardContent>

        </Card>
    );
}