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
    const res = await fetchWithToken(`/tasks/comentar/${task._id}`, {
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
    const res = await fetchWithToken(`/tasks/etiquetar/${task._id}`, {
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
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 mb-6 space-y-4">
      {/* Título y botón eliminar */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
        <button
          onClick={handleDelete}
          className="text-sm text-red-600 hover:underline"
        >
          Eliminar
        </button>
      </div>

      {/* Etiquetas */}
      <div className="flex flex-wrap gap-2">
        {(task.tags || []).map((tag: string, i: number) => (
          <span
            key={i}
            className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Añadir etiqueta */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nueva etiqueta"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="flex-1 h-10 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 transition"
        />
        <button
          onClick={handleAddTag}
          className="bg-orange-500 text-white px-4 h-10 rounded-lg hover:bg-orange-600 transition"
        >
          Agregar
        </button>
      </div>

      {/* Comentarios */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Comentarios:</h4>
        <div className="space-y-1 max-h-40 overflow-y-auto pr-2">
          {(task.comments || []).map((c: any, i: number) => (
            <p
              key={i}
              className="text-sm text-gray-600 border-b border-gray-100 pb-1"
            >
              • {c.text}
            </p>
          ))}
        </div>

        {/* Añadir comentario */}
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            placeholder="Escribir comentario"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 h-10 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 transition"
          />
          <button
            onClick={handleAddComment}
            className="bg-orange-500 text-white px-4 h-10 rounded-lg hover:bg-orange-600 transition"
          >
            Comentar
          </button>
        </div>
      </div>

      {/* Compartir tarea */}
      <div className="flex gap-2 items-center">
        <input
          type="email"
          placeholder="Compartir por email"
          value={shareEmail}
          onChange={(e) => setShareEmail(e.target.value)}
          className="flex-1 h-10 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 transition"
        />
        <button
          onClick={handleShare}
          className="bg-orange-500 text-white px-4 h-10 rounded-lg hover:bg-orange-600 transition"
        >
          Compartir
        </button>
      </div>
    </div>
  );
}
