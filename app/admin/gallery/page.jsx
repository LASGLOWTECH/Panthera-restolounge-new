"use client";

import { useEffect, useState } from "react";
import GalleryGrid from "@/components/GalleryGrid";

export default function AdminGalleryPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/gallery"); // your API route
      const data = await res.json();
      setImages(data);
    };
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Gallery</h1>

      {images.length === 0 ? (
        <p>No images uploaded yet</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {images.map((img) => (
            <GalleryGrid key={img._id} image={img} />
          ))}
        </div>
      )}
    </div>
  );
}
