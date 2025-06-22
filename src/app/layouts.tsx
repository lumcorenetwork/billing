'use client';

import { ReactNode } from 'react';
import { Menu, Bell, User } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 hidden md:block">
        <div className="text-2xl font-bold mb-6">Cursed Hosting</div>
        <nav className="space-y-3">
          <a href="/dashboard" className="block px-4 py-2 rounded hover:bg-slate-800">Dashboard</a>
          <a href="/tickets" className="block px-4 py-2 rounded hover:bg-slate-800">Tickets</a>
          <a href="/servers" className="block px-4 py-2 rounded hover:bg-slate-800">Servers</a>
          <a href="/staff" className="block px-4 py-2 rounded hover:bg-slate-800">Staff</a>
          <a href="/logs" className="block px-4 py-2 rounded hover:bg-slate-800">Logs</a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded hover:bg-slate-800">
              <Menu />
            </button>
            <input
              type="text"
              placeholder="Search..."
              className="bg-slate-800 text-sm text-white px-3 py-2 rounded-md w-64 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded hover:bg-slate-800">
              <Bell />
            </button>
            <button className="p-2 rounded hover:bg-slate-800">
              <User />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-y-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
