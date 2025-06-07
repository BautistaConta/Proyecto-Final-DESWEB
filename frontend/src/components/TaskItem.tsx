// src/components/TaskItem.tsx
import { fetchWithToken } from "@/utils/api";

export default function TaskItem({
  task,
  onDelete,
}: {
  task: any;
  onDelete: () => void;
}) {
  const handleDelete = async () => {
    await fetchWithToken(`/tasks/${task._id}`, { method: "DELETE" });
    onDelete();
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-2 flex justify-between items-center">
      <span>{task.title}</span>
      <button onClick={handleDelete} className="text-red-500 text-sm">
        Eliminar
      </button>
    </div>
  );
}
