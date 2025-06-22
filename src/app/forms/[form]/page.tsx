"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function FormDetailPage() {
  const params = useParams();
  const formFile = params?.form ? String(params.form) : "";
  const [form, setForm] = useState<any>(null);
  const [signature, setSignature] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/forms/read?file=${encodeURIComponent(formFile)}`)
      .then((res) => res.json())
      .then((data) => setForm(data.form));
  }, [formFile]);

  async function handleSign(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/forms/sign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: formFile, signature }),
    });
    if (res.ok) {
      setMessage("Signed successfully");
      const data = await res.json();
      setForm(data.form);
      setSignature("");
    } else {
      setMessage("Failed to sign");
    }
  }

  if (!form) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
        <div className="mb-4 whitespace-pre-wrap">{form.content}</div>
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Signatures</h2>
          <ul>
            {form.signatures.map((sig: string, i: number) => (
              <li key={i} className="text-green-700">{sig}</li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSign} className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="Your name/signature"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            className="border rounded px-2 py-1"
            required
          />
          <button type="submit" className="btn btn-secondary">Sign</button>
        </form>
        {message && <div className="mt-4 text-green-600">{message}</div>}
      </div>
    </main>
  );
}
