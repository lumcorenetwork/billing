"use client";
import React, { useRef, useState } from "react";

export default function FileManager() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  async function fetchFiles() {
    const res = await fetch("/api/files");
    const data = await res.json();
    setFiles(data.files || []);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!fileInput.current?.files?.[0]) return;
    const formData = new FormData();
    formData.append("file", fileInput.current.files[0]);
    await fetch("/api/files", { method: "POST", body: formData });
    setMessage("File uploaded");
    fetchFiles();
  }

  async function handleRead(name: string) {
    const res = await fetch(`/api/files/read?name=${encodeURIComponent(name)}`);
    const data = await res.json();
    setSelectedFile(name);
    setFileContent(data.data || "");
  }

  async function handleSign(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile || !signature) return;
    await fetch("/api/files/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: selectedFile, signature }),
    });
    setMessage("File signed");
    handleRead(selectedFile);
  }

  React.useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <form onSubmit={handleUpload} className="mb-4">
        <input type="file" ref={fileInput} className="mb-2" />
        <button type="submit" className="btn btn-primary ml-2">Upload</button>
      </form>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Files</h3>
        <ul>
          {files.map((name) => (
            <li key={name} className="mb-1">
              <button onClick={() => handleRead(name)} className="underline text-blue-600">
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedFile && (
        <div className="mb-4">
          <h4 className="font-semibold">{selectedFile}</h4>
          <pre className="bg-gray-100 p-2 rounded overflow-x-auto max-h-60">{fileContent}</pre>
          <form onSubmit={handleSign} className="mt-2 flex gap-2">
            <input
              type="text"
              placeholder="Your name/signature"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <button type="submit" className="btn btn-secondary">Sign</button>
          </form>
        </div>
      )}
      {message && <div className="text-green-600 font-semibold">{message}</div>}
    </div>
  );
}
