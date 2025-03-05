"use client";

import Image from "next/image"; // Sử dụng Image của Next.js
import { MapPin } from "lucide-react"; // Icon cho địa chỉ
import Link from "next/link";

export default function DiaChiCuaHang() {
  return (
    <div className="relative w-full h-screen">
      {/* Hình ảnh cửa hàng làm panel */}
      <div className="absolute inset-0">
        <Image
          src="/shop/image.png" // Đặt đường dẫn đúng với ảnh cửa hàng của bạn
          alt="Cửa hàng"
          layout="fill"
          objectFit="cover"
          className="opacity-80" // Điều chỉnh độ mờ của ảnh
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50 p-6">
        <div className="text-white text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Địa Chỉ Cửa Hàng</h1>
          <div className="flex items-center justify-center space-x-2 text-xl">
            <MapPin size={24} />
            <p>123 Đường ABC, Quận XYZ, Thành phố Hồ Chí Minh</p>
          </div>

          <div className="mt-6">
            <Link
              href="https://www.google.com/maps?q=123+Đường+ABC,+Quận+XYZ,+Thành+phố+Hồ+Chí+Minh" // Đường dẫn Google Maps
              target="_blank"
              className="text-white border border-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition duration-300"
            >
              Xem trên Google Maps
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
