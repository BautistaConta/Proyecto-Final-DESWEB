'use client';
import { useState } from "react";
import { register } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await register(form);
    if (res.success) router.push("/login");
  };

   
 }
