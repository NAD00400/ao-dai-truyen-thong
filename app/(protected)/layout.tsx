"use client";

import { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";
import AdminSidebar from "./component/ux/sildebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-gray-100" >
      {/* Admin Panel (Header) */}
      <header className="bg-gray-800 text-white flex items-center justify-between py-4 px-6 shadow-md">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="text-white focus:outline-none"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </header>

      {/* Main Content with Sidebar and Content Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-20"
          } bg-gray-900 text-white`}
        >
          <AdminSidebar isOpen={isSidebarOpen} />
        </div>

        {/* Page Content */}
        <main className="pt-6 flex-1 overflow-auto bg-white shadow-md rounded-lg m-4 min-h-0">
              {children}
        </main>
      </div>
    </div>
  );
}
