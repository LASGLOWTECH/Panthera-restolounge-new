"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { useRouter } from "next/navigation";

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // 🔥 DELETE EVENT
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Failed to delete event");
        return;
      }

      // Remove deleted event without refreshing
      setEvents((prev) => prev.filter((event) => event._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting event");
    }
  };

  return (
    <div className="min-h-screen bg-dark p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Manage Events</h1>

      {loading && <p className="text-gray-300">Loading events...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && events.length === 0 && (
        <p className="text-gray-300">No events found.</p>
      )}

      {!loading && events.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="relative">
              {/* Event Card */}
              <EventCard
                title={event.title}
                description={event.description}
                date={event.date}
                image={event.image}
              />

              {/* Admin Buttons */}
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => router.push(`/admin/events/edit/${event._id}`)}
                  className="flex-1 py-2 bg-gold2 hover:bg-gold text-white rounded-lg"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(event._id)}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
