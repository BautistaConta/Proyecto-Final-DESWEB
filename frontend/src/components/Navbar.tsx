import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="bg-gray shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-orange-500">Gestor de Tareas</h1>
      <button
        onClick={handleLogout}
        className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 text-base font-medium transition"
      >
        Cerrar sesión
      </button>
    </nav>
  );
}
