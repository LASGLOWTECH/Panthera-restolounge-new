// EventCard.jsx

import React from 'react';

// Define the expected prop structure based on your Mongoose schema
const EventCard = ({ title, description, date, image }) => {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-2xl bg-gray-900 transition-transform duration-300 hover:scale-[1.03] cursor-pointer border border-gray-700">
      
      {/* 🖼️ Image Section */}
      {image && (
        <div className="h-56 overflow-hidden">
          {/* Assuming 'image' is a direct URL */}
          <img 
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110" 
            src={image} 
            alt={title} 
          />
        </div>
      )}

      {/* 📰 Card Content */}
      <div className="p-6 text-white">
        
        {/* Title */}
        <h3 className="font-display text-2xl font-bold mb-2 text-red-500 tracking-wider">
          {title}
        </h3>
        
        {/* Date/Time */}
        <p className="text-lg font-medium text-gray-300 mb-4">
          🗓️ **{date}**
        </p>
        
        {/* Description */}
        <p className="text-gray-400 text-base mb-4 line-clamp-3">
          {description}
        </p>
        
        {/* Action Button */}
        <button className="w-full mt-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200 shadow-md">
          Reserve Your Spot
        </button>
      </div>
    </div>
  );
};

export default EventCard;