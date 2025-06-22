import Layout from "../components/Layout";

export default function Staff() {
  return (
    <Layout>
      <h1 style={{ fontFamily: "Inter, Poppins, sans-serif", fontWeight: 700, fontSize: 28, marginBottom: 24 }}>
        Staff Manager
      </h1>
      <h2 style={{ fontWeight: 600, marginBottom: 12 }}>Roles & Permissions</h2>
      <table style={{ width: "100%", marginBottom: 24, borderRadius: 16, overflow: "hidden" }}>
        <thead style={{ background: "var(--color-surface)" }}>
          <tr>
            <th style={{ padding: 8 }}>Name</th>
            <th style={{ padding: 8 }}>Role</th>
            <th style={{ padding: 8 }}>Can Sign</th>
            <th style={{ padding: 8 }}>Can Approve</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: 8 }}>Jane Doe</td>
            <td style={{ padding: 8 }}>Admin</td>
            <td style={{ padding: 8 }}>✔️</td>
            <td style={{ padding: 8 }}>✔️</td>
          </tr>
          <tr>
            <td style={{ padding: 8 }}>John Smith</td>
            <td style={{ padding: 8 }}>Staff</td>
            <td style={{ padding: 8 }}>✔️</td>
            <td style={{ padding: 8 }}>❌</td>
          </tr>
        </tbody>
      </table>
      <h2 style={{ fontWeight: 600, marginBottom: 12 }}>LOA Requests</h2>
      <ul>
        <li>Jane Doe - 2024-07-01 to 2024-07-10 (Approved)</li>
      </ul>
      <h2 style={{ fontWeight: 600, marginBottom: 12, marginTop: 24 }}>Meeting Attendance</h2>
      <ul>
        <li>2024-06-01: Jane Doe (Present), John Smith (Absent)</li>
      </ul>
    </Layout>
  );
}
