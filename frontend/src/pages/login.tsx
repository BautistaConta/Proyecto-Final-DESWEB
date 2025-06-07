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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-50 p-8 rounded-2xl shadow-md w-full max-w-sm border"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Iniciar Sesión
        </h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input w-full mb-4"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input w-full mb-2"
          required
        />

        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}

        <button
          type="submit"
          className="btn-primary w-full py-3 text-lg rounded-xl mt-4"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
