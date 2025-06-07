// src/pages/dashboard.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      // Podés usar jwt-decode o llamar a /me en el backend
      setUser({ name: "Usuario Ejemplo" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bienvenido {user?.name}</h1>
        <button onClick={handleLogout} className="text-red-500 underline">Cerrar sesión</button>
      </div>
      {/* Acá irán los componentes como TaskList, TaskForm, etc. */}
      <p className="text-gray-700">Aquí se mostrarán tus tareas...</p>
    </div>
  );
}
