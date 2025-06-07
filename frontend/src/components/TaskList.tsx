import { useEffect, useState } from "react";
import { fetchWithToken } from "@/utils/api";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState<any[]>([]);

  const loadTasks = async () => {
    const res = await fetchWithToken("/tasks");
    if (!res.ok) return;
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <section className="mt-6 space-y-6">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No hay tareas por mostrar. ¡Agrega una nueva!
        </p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onDelete={loadTasks}
            onUpdate={loadTasks}
          />
        ))
      )}
    </section>
  );
}
