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
    <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        required
      />
      <button
        type="submit"
        className="bg-orange-500 text-white px-6 h-12 rounded-lg hover:bg-orange-600 transition font-medium"
      >
        Crear
      </button>
    </form>
  );
}
