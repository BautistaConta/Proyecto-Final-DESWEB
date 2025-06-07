import { useState } from "react";
import { fetchWithToken } from "@/utils/api";

export default function TaskItem({ task, onDelete, onUpdate }: { 
  task: any; 
  onDelete: () => void; 
  onUpdate: () => void; 
}) {
  const [commentText, setCommentText] = useState("");
  const [shareEmail, setShareEmail] = useState("");
  const [newTag, setNewTag] = useState("");

  const handleDelete = async () => {
    await fetchWithToken(`/tasks/${task._id}`, { method: "DELETE" });
    onDelete();
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    const res = await fetchWithToken(`/tasks/${task._id}/comments`, {
      method: "POST",
      body: JSON.stringify({ text: commentText }),
    });
    if (res.ok) {
      setCommentText("");
      onUpdate();
    }
  };

  const handleAddTag = async () => {
    if (!newTag.trim()) return;
    const res = await fetchWithToken(`/tasks/${task._id}/tags`, {
      method: "POST",
      body: JSON.stringify({ tag: newTag }),
    });
    if (res.ok) {
      setNewTag("");
      onUpdate();
    }
  };

  const handleShare = async () => {
    if (!shareEmail.trim()) return;
    const res = await fetchWithToken(`/tasks/compartir/${task._id}`, {
      method: "POST",
      body: JSON.stringify({ email: shareEmail }),
    });
    if (res.ok) {
      setShareEmail("");
      alert("Tarea compartida correctamente");
    } else {
      alert("Error al compartir tarea");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{task.title}</h3>
        <button onClick={handleDelete} className="text-red-500 text-sm">Eliminar</button>
      </div>

      {/* Etiquetas */}
      <div className="mt-2 flex flex-wrap gap-2">
        {(task.tags || []).map((tag: string, i: number) => (
          <span key={i} className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-xs">{tag}</span>
        ))}
      </div>

      {/* Añadir etiqueta */}
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          placeholder="Nueva etiqueta"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="input flex-1"
        />
        <button onClick={handleAddTag} className="btn-primary">Agregar</button>
      </div>

      {/* Comentarios */}
      <div className="mt-4">
        <h4 className="font-semibold mb-1">Comentarios:</h4>
        {(task.comments || []).map((c: any, i: number) => (
          <p key={i} className="border-b border-gray-200 py-1 text-sm">{c.text}</p>
        ))}

        {/* Añadir comentario */}
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Escribir comentario"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="input flex-1"
          />
          <button onClick={handleAddComment} className="btn-primary">Comentar</button>
        </div>
      </div>

      {/* Compartir tarea */}
      <div className="mt-4 flex gap-2 items-center">
        <input
          type="email"
          placeholder="Compartir por email"
          value={shareEmail}
          onChange={(e) => setShareEmail(e.target.value)}
          className="input flex-1"
        />
        <button onClick={handleShare} className="btn-primary">Compartir</button>
      </div>
    </div>
  );
}
