"use client";

import { Home, Calendar, FileText, Package, Shirt, Users } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { name: "Bảng Điều Khiển", icon: <Home size={20} />, href: "/bang-dieu-khien" },
  { name: "Lịch Hẹn", icon: <Calendar size={20} />, href: "/lich-hen" },
  { name: "Hóa Đơn", icon: <FileText size={20} />, href: "/hoa-don" },
  { name: "Đơn Hàng", icon: <Package size={20} />, href: "/don-hang" },
  { name: "Sản Phẩm", icon: <Shirt size={20} />, href: "/san-pham" },
  { name: "Khách Hàng", icon: <Users size={20} />, href: "/khach-hang" },
];

export default function AdminSidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`h-full bg-gray-800 text-white p-4 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <nav className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {item.icon}
            {isOpen && <span className="text-lg">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
