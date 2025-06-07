
import { useState } from "react";
import { fetchWithToken } from "@/utils/api";

export default function TaskForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetchWithToken("/tasks", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      setTitle("");
      onCreated();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input flex-1"
        required
      />
      <button type="submit" className="btn-primary">Crear</button>
    </form>
  );
}
