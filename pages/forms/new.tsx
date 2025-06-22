export default function NewForm() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Create New Form</h1>
      <form>
        <input placeholder="Form Name" style={{ marginRight: "1rem" }} />
        <button type="submit">Save</button>
      </form>
    </main>
  );
}
