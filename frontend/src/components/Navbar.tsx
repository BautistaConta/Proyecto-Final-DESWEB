// src/components/Navbar.tsx
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-xl font-semibold text-blue-600">Gestor de Tareas</h1>
      <button onClick={handleLogout} className="text-red-500 underline">
        Cerrar sesión
      </button>
    </nav>
  );
}
