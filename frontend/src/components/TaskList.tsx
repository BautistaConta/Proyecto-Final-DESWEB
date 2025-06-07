// src/components/TaskList.tsx
import { useEffect, useState } from "react";
import { fetchWithToken } from "@/utils/api";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState<any[]>([]);

  const loadTasks = async () => {
    const res = await fetchWithToken("/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onDelete={loadTasks} />
      ))}
    </div>
  );
}
