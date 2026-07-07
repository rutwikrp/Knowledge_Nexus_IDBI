import { useState } from "react";
import UploadCard from "@/components/upload/UploadCard";
import DocumentTable from "@/components/upload/DocumentTable";
import { uploadDocument } from "@/services/documentService";

export default function Upload() {

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);

  async function handleUpload() {

    if (!selectedFile) {
      alert("Select a PDF first");
      return;
    }

    try {

      setUploading(true);

      const response =
        await uploadDocument(selectedFile);

      console.log(response.message);

      alert("Document uploaded successfully!");

      setSelectedFile(null);

    } catch (err: any) {
      console.error("FULL ERROR:", err);
      console.error("RESPONSE:", err.response);
      console.error("DATA:", err.response?.data);
      console.error("MESSAGE:", err.message);

      alert(err.message);
    } finally {

      setUploading(false);

    }

  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Documents
        </h1>

        <p className="text-gray-500">
          Upload and manage your knowledge base
        </p>
      </div>

      <UploadCard
          selectedFile={selectedFile}
          uploading={uploading}
          onFileChange={(e) =>
        setSelectedFile(e.target.files?.[0] || null)
    }
          onUpload={handleUpload}
      />

      <DocumentTable />
    </>
  );
}