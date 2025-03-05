"use client";

import { motion } from "framer-motion";
import { Menu, ShoppingCart, User, X, MapPin } from "lucide-react"; // Thêm icon MapPin
import Link from "next/link";
import { useEffect, useState } from "react";

interface MenuItem {
  name: string;
  link: string;
  subItems?: { name: string; link: string }[]; // Chỉnh lại subItems kiểu dữ liệu
}

const menuItems: MenuItem[] = [
  
  { name: "Áo Dài Truyền Thống", link: "/products/traditional-ao-dai" },
  { name: "Áo Dài Công Sở", link: "/products/office-ao-dai" },
  { name: "Áo Dài Dự Tiệc", link: "/products/party-ao-dai" },
  { name: "Áo Dài Học Sinh", link: "/products/student-ao-dai" },
  { name: "Áo Dài Cho Gia Đình", link: "/products/family-ao-dai" },
  { name: "Liên Hệ Tư Vấn", link: "/contact" },
  { name: "Tư Vấn Thiết Kế", link: "/services/design-consultation" },  
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null); // Thiết lập kiểu dữ liệu cho hoveredMenu

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#003049]/90 shadow-md backdrop-blur-md" : "bg-[#003049]"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/">
          <h1 className="text-xl md:text-2xl font-bold tracking-wide text-white cursor-pointer">
            Áo Dài Truyền Thống
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 relative">
          {menuItems.map((menu, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => menu.subItems && setHoveredMenu(index)}
              onMouseLeave={() => menu.subItems && setHoveredMenu(null)}
            >
              <Link href={menu.link} className="text-white transition hover:text-gray-300">
                {menu.name}
              </Link>
              {hoveredMenu === index && menu.subItems && menu.subItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 top-full mt-2 bg-white shadow-lg py-4 w-48 rounded-md"
                >
                  {menu.subItems.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.link}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/cart" className="text-white relative">
            <ShoppingCart size={24} />
          </Link>
          <Link href="/account" className="text-white">
            <User size={24} />
          </Link>
          {/* Thêm icon địa chỉ cửa hàng */}
          <Link href="/location" className="text-white">
            <MapPin size={24} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden absolute top-full left-0 w-full bg-[#003049] shadow-md py-4"
        >
          {menuItems.map((menu, index) => (
            <div key={index} className="border-b border-gray-600 px-6 py-3">
              <Link
                href={menu.link}
                className="text-white block w-full"
                onClick={() => setIsOpen(false)}
              >
                {menu.name}
              </Link>
              {menu.subItems && (
                <div className="ml-4 mt-2">
                  {menu.subItems.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.link}
                      className="block text-gray-300 py-1 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </header>
  );
}
