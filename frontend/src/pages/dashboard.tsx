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
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-3xl mx-auto mt-10 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {showShared ? "Tareas compartidas contigo" : "Mis Tareas"}
        </h2>

        <div className="mb-8 flex gap-4">
          <button
            className={`rounded-xl px-6 py-3 text-lg font-semibold transition-all ${
              !showShared
                ? "bg-orange-500 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setShowShared(false)}
          >
            Mis tareas
          </button>
          <button
            className={`rounded-xl px-6 py-3 text-lg font-semibold transition-all ${
              showShared
                ? "bg-orange-500 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
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
          <section className="space-y-4">
            {sharedTasks.length === 0 ? (
              <p className="text-gray-500 text-center">No hay tareas compartidas contigo.</p>
            ) : (
              sharedTasks.map((task) => (
                <div key={task._id} className="bg-gray-50 p-4 rounded-lg shadow border">
                  <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                </div>
              ))
            )}
          </section>
        )}
      </main>
    </div>
  );
}
