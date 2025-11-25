"use client";
import { useState } from "react";
import AdminProtected from "@/components/AdminProtected";
import { useRouter } from "next/navigation";

export default function AddEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, description, date }),
    });
    router.push("/admin/events");
  };

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl mb-6 font-bold">Add Event</h1>
        <form className="grid gap-4 max-w-md" onSubmit={handleSubmit}>
          <input className="p-3 rounded bg-gray-800" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <textarea className="p-3 rounded bg-gray-800" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
          <input className="p-3 rounded bg-gray-800" type="date" value={date} onChange={e => setDate(e.target.value)} required />
          <button className="bg-green-600 p-3 rounded hover:bg-green-700">Add Event</button>
        </form>
      </div>
    </AdminProtected>
  );
}
