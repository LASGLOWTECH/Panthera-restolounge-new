"use client";
import { useEffect, useState } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading)
    return (
      <div className="text-white text-center py-20 bg-gray-900">
        Loading events...
      </div>
    );

  if (error)
    return (
      <div className="text-gold text-center py-20 bg-gray-900">
        {error}
      </div>
    );

  if (events.length === 0)
    return (
      <div className="text-white text-center py-20 bg-gray-900">
        No upcoming events scheduled. Check back soon!
      </div>
    );

  return (
    <div className="min-h-screen mt-16 bg-dark font-sans">
      {/* Page Header */}
      <header className="py-16 text-center text-white bg-black border-b border-gray-700">
        <h1 className="text-5xl  font-semibold font-serif tracking-tight my-4 text-gold">
          Upcoming Events
        </h1>
        <p className="text-xl text-gray-300">
          Join us for exclusive experiences at Panthera Restaurant
        </p>
      </header>

      {/* Event Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition"
            >
              {event.image && (
                <img
                  src={
                    event.image.startsWith("/")
                      ? event.image
                      : `/uploads/${event.image}`
                  }
                  alt={event.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-300 mb-2">
                {new Date(event.date).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-gray-300">{event.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      
    </div>
  );
}
