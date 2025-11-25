// components/AdminProtected.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminProtected({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) router.replace("/admin/login");
    else setLoading(false);
  }, [router]);

  if (loading) return <div className="text-center text-white mt-20">Checking authentication...</div>;
  return children;
}