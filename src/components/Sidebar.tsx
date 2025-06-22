"use client";
import Link from "next/link";
import { LayoutDashboard, Ticket, Server, Users, FileText } from "lucide-react";

const navItems = [
	{ name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
	{ name: "Tickets", href: "/tickets", icon: <Ticket size={20} /> },
	{ name: "Servers", href: "/servers", icon: <Server size={20} /> },
	{ name: "Staff", href: "/staff", icon: <Users size={20} /> },
	{ name: "Logs", href: "/logs", icon: <FileText size={20} /> },
];

export default function Sidebar() {
	return (
		<aside className="bg-[#1e293b] border-r border-[#334155] h-screen p-4 flex flex-col w-56 sidebar-spaced">
			{/* Removed LumeCore logo/title */}
			<nav className="flex-1 flex flex-col gap-6 justify-center">
				{navItems.map(item => (
					<Link
						key={item.name}
						href={item.href}
						className="btn rainbow-glow flex items-center gap-3 px-4 py-2 rounded-full font-semibold transition shadow mb-8"
					>
						<span>{item.icon}</span>
						<span>{item.name}</span>
					</Link>
				))}
			</nav>
		</aside>
	);
}
