// src/pages/index.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login"); // redirección inmediata al login
  }, []);

  return null; // no renderiza nada en pantalla
}
