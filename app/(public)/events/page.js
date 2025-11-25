// // EventsPage.jsx
// "use client";
// import React, { useState, useEffect } from 'react';
// import EventCard from "@/components/EventCard";
// import image from "@/components/EventCard";
// // Define the type for an Event based on the Mongoose schema
// // Note: _id and timestamps are included for completeness but not used in the card
// const dummyEvents = [
//   {
//     _id: '1',
//     title: "Live Jazz Night",
//     description: "An evening of smooth jazz with the renowned 'Blue Notes Trio.' Perfect for a relaxed, sophisticated dinner.",
//     date: "Friday, November 29th at 8:00 PM",
//     image: "/uploads/jazz-night-promo.jpg", 
//   },
//   {
//     _id: '2',
//     title: "Cocktail Masterclass",
//     description: "Learn to shake, stir, and garnish like a pro! Led by our Head Mixologist, Marco. Limited spots available.",
//     date: "Wednesday, December 4th at 7:00 PM",
//     image: "/uploads/cocktail-class.jpg", 
//   },
//   {
//     _id: '3',
//     title: "New Year's Eve Gala",
//     description: "Ring in the new year with a 5-course tasting menu, champagne toast, and a DJ set until 2 AM.",
//     date: "Tuesday, December 31st at 9:00 PM",
//     image: "/uploads/nye-gala.jpg", 
//   },
// ];

// const EventsPage = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // useEffect(() => {
//   //   const fetchEvents = async () => {
//   //     try {
//   //       // Replace with your actual API endpoint
//   //       const response = await fetch('/api/events'); 
//   //       if (!response.ok) {
//   //         throw new Error(`HTTP error! status: ${response.status}`);
//   //       }
//   //       const data = await response.json();
//   //       setEvents(data);
//   //     } catch (e) {
//   //       setError(e.message);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
    
//   //   fetchEvents();
//   // }, []);

//   // Use dummy data for display purposes
//   useEffect(() => {
//     setEvents(dummyEvents);
//     setLoading(false);
//   }, []);


//   if (loading) return <div className="text-white text-center py-20 bg-gray-800">Loading events...</div>;
//   if (error) return <div className="text-red-500 text-center py-20 bg-gray-800">Error loading events: {error}</div>;
//   if (events.length === 0) return <div className="text-white text-center py-20 bg-gray-800">No upcoming events scheduled. Check back soon!</div>;


//   return (
//     <div className="min-h-screen bg-gray-900 font-sans">
      
//       {/* 🌟 Page Header */}
//       <header className="py-16 text-center text-white bg-black/80 border-b border-red-600/50">
//         <h1 className="text-5xl font-extrabold tracking-tight mb-2 text-red-500">
//           Exclusive Events
//         </h1>
//         <p className="text-xl text-gray-300">
//           Experience the best of **[Restaurant Name]**
//         </p>
//       </header>

//       {/* 🖼️ Event Card Grid */}
//       <main className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {events.map((event) => (
//             <EventCard 
//               key={event._id}
//               title={event.title}
//               description={event.description}
//               date={event.date}
//               image={event.image} // Maps to your Mongoose 'image' field
//             />
//           ))}
//         </div>
//       </main>

//       {/* Optional: Footer */}
//       <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-700 mt-10">
//         © 2025 [Restaurant Name] | Follow us for updates
//       </footer>
//     </div>
//   );
// };

// export default EventsPage;





"use client";
import { useEffect, useState } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h1>
      {events.length === 0 ? (
        <p className="text-center">No events at the moment. Check back later</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
         {events.map((event) => (
  <div key={event._id} className="bg-gray-800 p-4 rounded shadow hover:shadow-lg">
    {event.image && (
      <img
        src={event.image} // URL from /uploads
        alt={event.title}
        className="w-full h-48 object-cover rounded mb-3"
      />
    )}
    <h2 className="text-xl font-bold mb-2">{event.title}</h2>
    <p className="text-gray-300 mb-2">{new Date(event.date).toLocaleDateString()}</p>
    <p className="text-gray-300">{event.description}</p>
  </div>
))}
        </div>
      )}
    </div>
  );
}




