import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.token) {
        return setError(data.message || "Credenciales incorrectas");
      }

      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      setError("Error al conectar con el servidor.");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <form
      onSubmit={handleLogin}
      className="bg-gray-50 p-10 rounded-3xl shadow-lg border border-gray-300 w-96"
    >
      <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">
        Iniciar Sesión
      </h2>

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-6 px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-700 placeholder-orange-400"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-700 placeholder-orange-400"
        required
      />

      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      <button
        type="submit"
        className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-2xl text-lg transition-colors"
      >
        Entrar
      </button>
    </form>
  </div>
);
}
