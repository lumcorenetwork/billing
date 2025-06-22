"use client";
import { Bell, User } from "lucide-react";

export default function TopBar() {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 border-b border-[#334155] shadow-lg">
      <div className="flex items-center gap-4 w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-[#232946] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-md placeholder:text-slate-400"
        />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <span className="text-2xl font-bold text-white tracking-wide drop-shadow-lg px-8 py-3 bg-blue-600 rainbow-glow rounded-lg animate-pulse">
          Welcome to LumeCore Staff Panel
        </span>
      </div>
      <div className="flex items-center gap-6 w-1/3 justify-end">
        <span className="flex items-center gap-1 text-green-400 font-semibold bg-[#1e293b] px-3 py-1 rounded-full shadow">
          ●{" "}
          <span className="hidden sm:inline">12 Nodes Online</span>
        </span>
        <span className="flex items-center gap-1 text-purple-400 font-semibold bg-[#1e293b] px-3 py-1 rounded-full shadow">
          ●{" "}
          <span className="hidden sm:inline">5 Open Tickets</span>
        </span>
        <button className="p-2 rounded-full hover:bg-gradient-to-tr hover:from-blue-500 hover:to-purple-500 transition shadow text-white bg-white border-2 border-blue-500 hover:shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <Bell size={22} color="#232946" />
        </button>
        <button className="p-2 rounded-full hover:bg-gradient-to-tr hover:from-blue-500 hover:to-purple-500 transition shadow text-white bg-white border-2 border-blue-500 hover:shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <User size={22} color="#232946" />
        </button>
      </div>
    </header>
  );
}
