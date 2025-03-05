import React, { useState } from "react";
import Image from "next/image";

interface Item {
  title: string;
  detai:string;
  image: string;
  link: string;
}

interface ImagePanelProps {
  items: Item[];
}

const ImagePanel: React.FC<ImagePanelProps> = ({ items }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative w-full h-48 flex items-center justify-center  ">
      {/* Sử dụng Next.js Image để hiển thị ảnh nền */}
      <div className="absolute inset-0  ">
        <Image
          src={items[current].image}
          alt={items[current].title}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={75}
          className="rounded-lg"
        />
        {/* Overlay để tăng độ tương phản cho nội dung */}
        <div className="absolute inset-0 bg-black opacity-40 rounded-lg "></div>
      </div>

      {/* Nội dung chính chồng lên ảnh */}
      <div className="text-center z-30">
        <h1 className="text-4xl  text-white">{items[current].title}</h1>
        <p className="text-lg text-gray-200">{items[current].detai}</p>
        <a
          href={items[current].link}
          className="mt-4 inline-block px-6 py-2 bg-[#FDF0D5] bg-opacity-50 text-[#FDF0D5] font-bold border border-[#FDF0D5] rounded transition duration-300 hover:bg-[#669BBC] hover:bg-opacity-50 hover:border-[#FDF0D5] hover:text-[#ffffff]"
        >
          XEM NGAY
        </a>
      </div>

      {/* Dấu trang (Pagination Dots) để chuyển đổi ảnh */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-1 rounded-full transition-colors duration-300 ${
              index === current ? "bg-[#669BBC]" : "bg-[#FDF0D5]"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImagePanel;
