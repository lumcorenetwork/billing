import { useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
};

const mockUsers: User[] = [
  { id: "1", name: "Jane Doe", email: "jane@example.com", role: "admin", permissions: ["manage_servers", "manage_billing"] },
  { id: "2", name: "John Smith", email: "john@example.com", role: "staff", permissions: ["manage_tickets"] },
];

const allPermissions = [
  { key: "manage_servers", label: "Manage Servers" },
  { key: "manage_billing", label: "Manage Billing" },
  { key: "manage_tickets", label: "Manage Tickets" },
  { key: "manage_staff", label: "Manage Staff" },
];

export default function StaffPermissions() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const togglePermission = (userId: string, perm: string) => {
    setUsers(users =>
      users.map(u =>
        u.id === userId
          ? {
              ...u,
              permissions: u.permissions.includes(perm)
                ? u.permissions.filter(p => p !== perm)
                : [...u.permissions, perm],
            }
          : u
      )
    );
    // TODO: Call backend API to update permissions
  };

  const changeRole = (userId: string, role: string) => {
    setUsers(users =>
      users.map(u => (u.id === userId ? { ...u, role } : u))
    );
    // TODO: Call backend API to update role
  };

  return (
    <Layout>
      <h1 style={{ fontWeight: 700, fontSize: 28, marginBottom: 24 }}>Staff Permissions</h1>
      <div style={{ marginBottom: 16 }}>
        <Link href="/settings">
          <button style={{ background: "#8b5cf6", color: "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", fontWeight: 600 }}>
            Go to Settings
          </button>
        </Link>
      </div>
      <table style={{ width: "100%", borderRadius: 16, overflow: "hidden" }}>
        <thead style={{ background: "var(--color-surface)" }}>
          <tr>
            <th style={{ padding: 8 }}>Name</th>
            <th style={{ padding: 8 }}>Email</th>
            <th style={{ padding: 8 }}>Role</th>
            <th style={{ padding: 8 }}>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={{ padding: 8 }}>{user.name}</td>
              <td style={{ padding: 8 }}>{user.email}</td>
              <td style={{ padding: 8 }}>
                <select
                  value={user.role}
                  onChange={e => changeRole(user.id, e.target.value)}
                  style={{ borderRadius: 8, padding: 4 }}
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="user">User</option>
                </select>
              </td>
              <td style={{ padding: 8 }}>
                {allPermissions.map(perm => (
                  <label key={perm.key} style={{ marginRight: 12 }}>
                    <input
                      type="checkbox"
                      checked={user.permissions.includes(perm.key)}
                      onChange={() => togglePermission(user.id, perm.key)}
                    />{" "}
                    {perm.label}
                  </label>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
