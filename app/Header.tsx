"use client";

import { motion } from "framer-motion";
import { LucideUserCheck, MapPin, Menu, ShoppingCart, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthStore } from "./(public)/storage-local/authStore";
import { useCart } from "./context/cartContext";

interface MenuItem {
  name: string;
  link: string;
  subItems?: { name: string; link: string }[];
}

const menuItems: MenuItem[] = [
  { name: "Áo Dài Truyền Thống", link: "/products/traditional-ao-dai" },
  { name: "Áo Dài Công Sở", link: "/products/office-ao-dai" },
  { name: "Áo Dài Dự Tiệc", link: "/products/party-ao-dai" },
  { name: "Áo Dài Học Sinh", link: "/products/student-ao-dai" },
  { name: "Áo Dài Cho Gia Đình", link: "/products/family-ao-dai" },
  { name: "Tư Vấn Thiết Kế", link: "/services" },{ name: "Liên Hệ", link: "/contact" },
];

export default function Header() {
  const [cartCount, setCartCount] = useState<number>(0);
  const { cart } = useCart(); // Giả sử cart luôn là một mảng
  
  useEffect(() => {
    if (Array.isArray(cart)) { // Đảm bảo cart là mảng
      const total = cart.reduce((acc, item) => acc + (item.quantity || 0), 0); 
      setCartCount(total);
      console.log("cart count", total); // Log ra giá trị mới thay vì cartCount cũ
      console.log("Cart data:", cart);

    }
  }, [cart]); // Khi cart thay đổi, effect sẽ chạy lại
  

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu open state
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[]);

  // Xử lý "Liên Hệ": nếu trên mobile, mở Zalo; nếu trên PC, hiển thị modal QR code
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      // Trên thiết bị di động, chuyển hướng mở ứng dụng Zalo
      window.location.href = "zalo://chat?phone=0909123456"; // Thay số điện thoại cửa hàng
    } else {
      // Trên máy tính, hiển thị modal QR code
      setIsContactModalOpen(true);
    }
  };

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#003049]/90 shadow-md backdrop-blur-md"
            : "bg-[#003049]"
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
                onMouseEnter={() =>
                  menu.subItems ? setHoveredMenu(index) : null
                }
                onMouseLeave={() =>
                  menu.subItems ? setHoveredMenu(null) : null
                }
              >
                {menu.name === "Liên Hệ" ? (
                  <a
                    href="#"
                    onClick={handleContactClick}
                    className="text-white transition hover:text-gray-300"
                  >
                    {menu.name}
                  </a>
                ) : (
                  <Link
                    href={menu.link}
                    className="text-white transition hover:text-gray-300"
                  >
                    {menu.name}
                  </Link>
                )}
                {hoveredMenu === index &&
                  menu.subItems &&
                  menu.subItems.length > 0 && (
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
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
            <Link href="/account" className="text-white">
              {user ? <LucideUserCheck size={24} /> : <User size={24} />}
            </Link>
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
                {menu.name === "Liên Hệ" ? (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleContactClick(e);
                      setIsOpen(false);
                    }}
                    className="text-white block w-full"
                  >
                    {menu.name}
                  </a>
                ) : (
                  <Link
                    href={menu.link}
                    className="text-white block w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    {menu.name}
                  </Link>
                )}
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

      {/* Modal hiển thị QR code Zalo cho phiên bản PC */}
      {isContactModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div className="bg-white p-3 rounded-md relative max-w-sm mx-auto text-center">
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-2 right-2 text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Kết nối Zalo</h2>
            <p className="mb-4 text-sm max-w-80">
              Quét mã QR bên dưới bằng Zalo để kết nối với cửa hàng
            </p>
            <div className="flex justify-center">
              <Image
                src="/zalo-qr/z6377267975566_d62295213f43a2ca5221f5fc9937c212.jpg" // Đường dẫn ảnh QR của cửa hàng
                alt="QR Code Zalo"
                width={300}
                height={450}
                className="rounded-sm"
              />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
