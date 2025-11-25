"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminProtected from "@/components/AdminProtected";

export default function EditEvent() {
  const { id } = useParams();
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch(`/api/events/${id}`);
      const data = await res.json();
      setTitle(data.title || "");
      setDescription(data.description || "");
      setDate(data.date ? data.date.split("T")[0] : "");
    };
    fetchEvent();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`/api/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, description, date }),
    });
    router.push("/admin/events");
  };

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl mb-6 font-bold">Edit Event</h1>
        <form className="grid gap-4 max-w-md" onSubmit={handleUpdate}>
          <input className="p-3 rounded bg-gray-800" value={title} onChange={e => setTitle(e.target.value)} required />
          <textarea className="p-3 rounded bg-gray-800" value={description} onChange={e => setDescription(e.target.value)} required />
          <input className="p-3 rounded bg-gray-800" type="date" value={date} onChange={e => setDate(e.target.value)} required />
          <button className="bg-blue-600 p-3 rounded hover:bg-blue-700">Update Event</button>
        </form>
      </div>
    </AdminProtected>
  );
}
