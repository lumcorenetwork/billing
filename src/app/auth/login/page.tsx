"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
      // Store username in localStorage for dashboard greeting
      if (typeof window !== "undefined") {
        localStorage.setItem("lcb_username", username);
      }
      router.push("/dashboard");
    } else {
      setError(data.error || "Login failed");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f172a]">
      <form onSubmit={handleLogin} className="bg-[#1e293b] p-8 rounded-lg shadow-lg flex flex-col gap-4 w-80 max-w-full">
        <h1 className="text-2xl font-bold text-white mb-2">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="px-3 py-2 rounded border bg-[#232946] text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="px-3 py-2 rounded border bg-[#232946] text-white"
          required
        />
        {error && <div className="text-red-500 font-semibold">{error}</div>}
        <button type="submit" className="btn">Login</button>
        <button type="button" className="btn flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white" onClick={() => window.location.href = '/api/auth/discord'}>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.07.07 0 00-.073.035c-.211.375-.444.864-.608 1.249a18.524 18.524 0 00-5.487 0 12.683 12.683 0 00-.617-1.249.07.07 0 00-.073-.035A19.736 19.736 0 003.677 4.369a.064.064 0 00-.03.027C.533 8.159-.32 11.81.099 15.415a.08.08 0 00.028.056c2.052 1.507 4.042 2.422 5.992 3.029a.077.077 0 00.084-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 00-.041-.104c-.652-.247-1.27-.549-1.872-.892a.077.077 0 01-.008-.127c.126-.094.252-.192.371-.291a.07.07 0 01.071-.01c3.927 1.793 8.18 1.793 12.061 0a.07.07 0 01.072.009c.12.099.245.197.372.291a.077.077 0 01-.006.127 12.298 12.298 0 01-1.873.893.076.076 0 00-.04.103c.36.699.772 1.364 1.227 1.995a.076.076 0 00.084.028c1.961-.607 3.951-1.522 6.003-3.029a.077.077 0 00.028-.055c.5-4.177-.838-7.797-3.548-11.019a.061.061 0 00-.03-.028zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z"/></svg>
          Login with Discord
        </button>
        <div className="text-center text-slate-400 mt-2">
          Don't have an account? <a href="/auth/signup" className="text-blue-400 underline">Sign up</a>
        </div>
      </form>
    </main>
  );
}
