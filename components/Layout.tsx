import React, { useState } from "react";
import Link from "next/link";
import { FiHome, FiFileText, FiUsers, FiServer, FiLogOut, FiBookOpen, FiMenu, FiX, FiBell, FiSearch } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/dashboard", icon: <FiHome />, label: "Dashboard" },
  { href: "/tickets", icon: <FiFileText />, label: "Tickets" },
  { href: "/servers", icon: <FiServer />, label: "Servers" },
  { href: "/staff", icon: <FiUsers />, label: "Staff" },
  { href: "/logs", icon: <FiBookOpen />, label: "Logs" },
  { href: "/billing", icon: <FiFileText />, label: "Billing" },
  { href: "/staff-permissions", icon: <FiUsers />, label: "Permissions" },
  { href: "/settings", icon: <FiBookOpen />, label: "Settings" }, // Add this line
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-bg-gradient)" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? 220 : 64,
          background: "var(--color-bg)",
          transition: "width 0.2s",
          boxShadow: "2px 0 8px rgba(16,24,40,0.04)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem 0",
        }}
      >
        <button
          aria-label="Toggle sidebar"
          style={{
            background: "none",
            border: "none",
            color: "var(--color-primary)",
            fontSize: 24,
            marginBottom: "2rem",
            cursor: "pointer",
          }}
          onClick={() => setSidebarOpen((v) => !v)}
        >
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>
        {navItems.map((item) => (
          <Link href={item.href} key={item.href} style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: sidebarOpen ? 12 : 0,
                padding: "0.75rem 1rem",
                borderRadius: "1rem",
                color: "var(--color-text)",
                fontWeight: 500,
                margin: "0.25rem 0",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </div>
          </Link>
        ))}
        <div style={{ flex: 1 }} />
        <Link href="/auth/logout" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: sidebarOpen ? 12 : 0,
              padding: "0.75rem 1rem",
              borderRadius: "1rem",
              color: "var(--color-secondary)",
              fontWeight: 500,
              margin: "0.25rem 0",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 20 }}><FiLogOut /></span>
            {sidebarOpen && <span>Logout</span>}
          </div>
        </Link>
      </aside>
      {/* Main Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Bar */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 2rem",
            background: "var(--color-surface)",
            boxShadow: "0 2px 8px rgba(16,24,40,0.04)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <FiSearch style={{ fontSize: 20, color: "var(--color-accent)" }} />
            <input
              type="text"
              placeholder="Search..."
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--color-text)",
                fontSize: 16,
                width: 200,
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <FiBell style={{ fontSize: 22, color: "var(--color-accent)" }} />
            <ThemeToggle />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "var(--color-primary)",
                color: "#fff",
                borderRadius: 24,
                padding: "0.25rem 1rem",
                fontWeight: 600,
              }}
            >
              <span>Jane Doe</span>
              <img
                src="/avatar.png"
                alt="User"
                style={{ width: 32, height: 32, borderRadius: "50%" }}
              />
            </div>
          </div>
        </header>
        {/* Main Content */}
        <main style={{ flex: 1, padding: "2rem", background: "none" }}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;