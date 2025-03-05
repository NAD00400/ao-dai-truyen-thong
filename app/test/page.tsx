'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const videos = [
  {
    id: 1,
    src: "https://www.youtube.com/embed/Q_MndNHZRws?si=i9v0Qfbys2vEfrxV",
    thumbnail: "/thumbnails/video1.jpg", // Thay bằng đường dẫn thumbnail của bạn
  },
  {
    id: 2,
    src: "https://www.youtube.com/embed/anotherVideoId",
    thumbnail: "/thumbnails/video2.jpg",
  },
  // Thêm video khác nếu cần
];

export default function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [isEnlarged, setIsEnlarged] = useState(false);

  // Hàm toggle phóng to video (nếu bạn muốn ấn vào video để phóng to)
  const toggleEnlarge = () => {
    setIsEnlarged((prev) => !prev);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="px-6 py-12 text-center"
    >
      <h2 className="text-4xl font-bold text-[#8B0000] mb-6">Video Áo Dài</h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto italic mb-8">
        Xem các mẫu áo dài đẹp nhất qua video thực tế.
      </p>

      {/* Khung video chính */}
      <div
        className={`relative mx-auto overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ${
          isEnlarged ? "max-w-5xl" : "max-w-3xl"
        }`}
        style={{ aspectRatio: "16 / 9" }}
        onClick={toggleEnlarge}
      >
        <iframe
          className="w-full h-full"
          src={selectedVideo.src}
          allowFullScreen
        ></iframe>
      </div>

      {/* Danh sách thumbnail video */}
      <div className="mt-6 flex justify-center gap-4 flex-wrap">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-300 ${
              video.id === selectedVideo.id ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => setSelectedVideo(video)}
          >
            <Image
              src={video.thumbnail}
              alt={`Thumbnail video ${index + 1}`}
              width={150}
              height={84}
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      <p className="mt-2 text-sm text-gray-600">
        {isEnlarged ? "Nhấn để thu nhỏ video" : "Nhấn vào video để phóng to"}
      </p>
    </motion.section>
  );
}
