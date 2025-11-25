"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaPlus, FaListUl, FaImage } from "react-icons/fa";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // Check login state
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    // If user is NOT logged in and tries to access any admin page except login
    if (!token && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }

    // If user IS logged in but tries to visit login page again
    if (token && pathname === "/admin/login") {
      router.replace("/admin/events"); // your default dashboard page
    }
  }, [pathname, router]);

  // Hide entire dashboard layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const linkClass = (path) =>
    `flex items-center w-full py-2 px-3 rounded-md text-gray-700 hover:bg-gray-200 ${
      pathname === path ? "bg-gray-200 font-semibold" : ""
    }`;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-white w-64 py-8 px-4 shadow-md">
        <div className="text-lg font-semibold mb-6 text-gray-800">Admin Panel</div>

        <nav className="flex flex-col space-y-2">
          <Link href="/admin/events" className={linkClass("/admin/events")}>
            <FaListUl className="h-5 w-5 mr-2" /> Events List
          </Link>
          <Link href="/admin/events/create" className={linkClass("/admin/events/create")}>
            <FaPlus className="h-5 w-5 mr-2" /> Create Event
          </Link>

          <Link href="/admin/gallery" className={linkClass("/admin/gallery")}>
            <FaImage className="h-5 w-5 mr-2" /> Gallery List
          </Link>
          <Link href="/admin/gallery/add" className={linkClass("/admin/gallery/add")}>
            <FaPlus className="h-5 w-5 mr-2" /> Add Gallery Image
          </Link>

          <Link href="/admin/reservations" className={linkClass("/admin/reservations")}>
            <FaListUl className="h-5 w-5 mr-2" /> Reservations
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
