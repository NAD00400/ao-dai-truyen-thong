"use client";
import { useState } from "react";
import Image from "next/image";

// Giả sử bạn có một component Modal hoặc dùng thư viện của bên thứ 3
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
  
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) =>{
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg">
        {children}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Khi nhấp "Liên Hệ", mở modal
  const handleContactClick = (e:any) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <header className="flex justify-between p-4 bg-gray-200">
        <div className="logo">Logo cửa hàng</div>
        <nav>
          <ul className="flex gap-4">
            {/* Các mục khác */}
            <li>
              <a href="/contact" onClick={handleContactClick}>
                Liên Hệ
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Modal hiển thị mã QR Zalo */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4 text-center">
          Kết nối Zalo của cửa hàng
        </h2>
        <p className="text-center text-sm mb-4">
          Quét mã QR bên dưới bằng Zalo để kết nối nhanh
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/zalo-qr.png" // Thay bằng đường dẫn mã QR của cửa hàng
            alt="QR Code Zalo"
            width={200}
            height={200}
          />
        </div>
      </Modal>
    </>
  );
}
