// "use client";
// import { useEffect, useState } from "react";

// export default function EventsPage() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await fetch("/api/events");
//         if (!res.ok) throw new Error("Failed to fetch events");
//         const data = await res.json();
//         setEvents(data);
//       } catch (err) {
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   if (loading)
//     return (
//       <div className="text-white text-center py-32 bg-dark">
//         Loading events...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-gold text-center py-32 bg-dark">
//         {error}
//       </div>
//     );

//   if (events.length === 0)
//     return (
//       <div className="text-white text-center py-20 bg-gray-900">
//         No upcoming events scheduled. Check back soon!
//       </div>
//     );

//   return (
//     <div className="min-h-screen mt-16 bg-dark font-sans">
//       {/* Page Header */}
//       <header className="py-16 text-center text-white bg-black border-b border-gray-700">
//         <h1 className="text-5xl  font-semibold font-serif tracking-tight my-4 text-gold">
//           Upcoming Events
//         </h1>
//         <p className="text-xl text-gray-300">
//           Join us for exclusive experiences at Panthera Restaurant
//         </p>
//       </header>

//       {/* Event Grid */}
//       <main className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {events.map((event) => (
//             <div
//               key={event._id}
//               className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition"
//             >
//               {event.image && (
//                 <img
//                   loading="lazy"
//                   src={
//                     event.image.startsWith("/")
//                       ? event.image
//                       : `/uploads/${event.image}`
//                   }
//                   alt={event.title}
//                   className="w-full h-48 object-cover rounded mb-3"
//                 />
//               )}
//               <h2 className="text-xl font-bold mb-2">{event.title}</h2>
//               <p className="text-gray-300 mb-2">
//                 {new Date(event.date).toLocaleString("en-US", {
//                   weekday: "long",
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </p>
//               <p className="text-gray-300">{event.description}</p>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Footer */}

//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { FaRegCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

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
      <div className="text-white text-center bg-dark">
        Loading events...
      </div>
    );

  if (error)
    return (
      <div className="text-gold text-center py-32 bg-dark">
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
      {/* Header */}
      <header className="py-12 text-center text-white bg-black border-b border-gray-700">
        <h1 className="text-5xl font-semibold font-serif tracking-tight my-4 text-gold">
          Upcoming Events
        </h1>
        <p className="text-xl text-gray-300">
          Exclusive experiences & special events at Panthera Restaurant
        </p>
      </header>

      {/* Event List */}
      <main className="container mx-auto px-4 py-12 space-y-10">
        {events.map((event) => {
          const dateObj = new Date(event.date);
          const day = dateObj.toLocaleString("en-US", { day: "numeric" });
          const month = dateObj.toLocaleString("en-US", { month: "short" });

          return (

            <Link
              href={`/events/${event._id}`}
              key={event._id}
              className="bg-dark border border-gray-700 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row hover:shadow-2xl transition"
            >

              {/* LEFT: IMAGE */}
              <div className="md:w-1/3 relative">
                {event.image && (
                  <img
                    loading="lazy"
                    src={
                      event.image.startsWith("/")
                        ? event.image
                        : `/uploads/${event.image}`
                    }
                    alt={event.title}
                    className="w-full h-64 object-cover"
                  />
                )}

                {/* DATE BADGE */}
                <div className="absolute bottom-3 left-3 bg-gold text-black text-center w-16 py-2 rounded-md font-bold shadow">
                  <p className="text-lg">{day}</p>
                  <p className="text-xs">{month.toUpperCase()}</p>
                </div>
              </div>

              {/* RIGHT: DETAILS */}
              <div className="md:w-2/3 p-6 flex flex-col justify-between">
                <div>
                  {/* TITLE */}
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {event.title}
                  </h2>

                  {/* DATE ROW */}
                  <div className="flex items-center gap-2 text-gray-300 mb-2">
                    <FaRegCalendarAlt />
                    {dateObj.toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>

                  {/* LOCATION ROW */}
                  {event.location && (
                    <div className="flex items-center gap-2 text-gray-300 mb-3">
                      <FaMapMarkerAlt />
                      {event.location}
                    </div>
                  )}

                  {/* DESCRIPTION */}
                  <p className="text-gray-400 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* JOIN BUTTON */}
                <div className="mt-5">
                  <button className="px-6 py-3 bg-gold text-black rounded-lg font-semibold hover:bg-yellow-400 transition">
                    Join Event
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </main>
    </div>
  );
}
