"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function FormsListPage() {
  const [forms, setForms] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/forms")
      .then((res) => res.json())
      .then((data) => setForms(data.forms || []));
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-transparent">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">All Forms</h2>
        <ul className="space-y-4">
          {forms.length === 0 && <li className="text-gray-500">No forms found.</li>}
          {forms.map((form) => (
            <li key={form.file} className="flex flex-col md:flex-row md:items-center md:justify-between bg-blue-50 rounded p-4">
              <div>
                <div className="font-semibold text-lg">{form.title}</div>
                <div className="text-gray-600 text-sm">{form.content.slice(0, 60)}...</div>
              </div>
              <Link href={`/forms/${form.file}`} className="btn btn-primary mt-2 md:mt-0 w-full md:w-auto">View & Sign</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
