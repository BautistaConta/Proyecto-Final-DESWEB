import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { fetchWithToken } from "@/utils/api";

export default function Dashboard() {
  const router = useRouter();
  const [sharedTasks, setSharedTasks] = useState<any[]>([]);
  const [showShared, setShowShared] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  const loadSharedTasks = async () => {
    const res = await fetchWithToken("/tasks/shared");
    if (!res.ok) return;
    const data = await res.json();
    setSharedTasks(data);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-2xl mx-auto mt-6 p-4">
        <div className="mb-4 flex gap-2">
          <button
            className={`btn-primary ${!showShared ? "bg-blue-600" : "bg-blue-400"}`}
            onClick={() => setShowShared(false)}
          >
            Mis tareas
          </button>
          <button
            className={`btn-primary ${showShared ? "bg-blue-600" : "bg-blue-400"}`}
            onClick={() => {
              setShowShared(true);
              loadSharedTasks();
            }}
          >
            Compartidas conmigo
          </button>
        </div>

        {!showShared ? (
          <>
            <TaskForm onCreated={() => {}} />
            <TaskList />
          </>
        ) : (
          <div>
            {sharedTasks.length === 0 && <p>No hay tareas compartidas contigo.</p>}
            {sharedTasks.map((task) => (
              <div key={task._id} className="bg-white p-4 rounded shadow mb-4">
                <h3 className="font-semibold">{task.title}</h3>
                {/* Podés agregar más info si querés */}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
