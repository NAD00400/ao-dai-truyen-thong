"use client";
import { FaCartArrowDown } from "react-icons/fa";
import { TbArrowMoveLeft, TbArrowMoveRight } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";

const videos = [
  {
    id: 1,
    src: "https://www.youtube.com/embed/Q_MndNHZRws?si=i9v0Qfbys2vEfrxV",
    thumbnail: "/shop/DALL·E 2025-03-04 14.13.20 - A modern and elegant traditional Vietnamese áo dài boutique interior. The store has a minimalist yet luxurious desi.webp",
  },
  {
    id: 2,
    src: "https://www.youtube.com/embed/NbzajhnKjms?si=L6s2RCMN9fig7G2y",
    thumbnail: "/shop/DALL·E 2025-03-04 14.13.20 - A modern and elegant traditional Vietnamese áo dài boutique interior. The store has a minimalist yet luxurious desi.webp",
  },
  {
    id: 3,
    src: "https://www.youtube.com/embed/Q_MndNHZRws?si=i9v0Qfbys2vEfrxV",
    thumbnail: "/shop/DALL·E 2025-03-04 14.13.20 - A modern and elegant traditional Vietnamese áo dài boutique interior. The store has a minimalist yet luxurious desi.webp",
  },
  {
    id: 4,
    src: "https://www.youtube.com/embed/NbzajhnKjms?si=L6s2RCMN9fig7G2y",
    thumbnail: "/shop/DALL·E 2025-03-04 14.13.20 - A modern and elegant traditional Vietnamese áo dài boutique interior. The store has a minimalist yet luxurious desi.webp",
  },
  {
    id: 5,
    src: "https://www.youtube.com/embed/Q_MndNHZRws?si=i9v0Qfbys2vEfrxV",
    thumbnail: "/shop/DALL·E 2025-03-04 14.13.20 - A modern and elegant traditional Vietnamese áo dài boutique interior. The store has a minimalist yet luxurious desi.webp",
  },
 
  // Thêm video khác nếu cần
];
export default function LandingPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollPositions, setScrollPositions] = useState<{ [key: string]: number }>({});
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const route = useRouter()

  const handelDetail=(id:string)=>{
    route.push(`/products/product-detail/${id}`);
  }
    // Hàm toggle phóng to video (nếu bạn muốn ấn vào video để phóng to)
    // const toggleEnlarge = () => {
    //   setIsEnlarged((prev) => !prev);
    // };
  
  // Định nghĩa thứ tự mong muốn cho các danh mục
    const desiredOrder = ["ao-dai-cong-so", "ao-dai-du-tiec", "ao-dai-truyen-thong", "ao-dai-hoc-sinh", "ao-dai-gia-dinh"];
    // Sau khi fetch xong, sắp xếp danh mục theo thứ tự mong muốn
    const sortedCategories = categories.slice().sort((a, b) => {
      // So sánh theo tên (đã chuyển thành chữ thường để khớp với mảng desiredOrder)
      return desiredOrder.indexOf(a.ma_danh_muc) - desiredOrder.indexOf(b.ma_danh_muc);

    });

  const fetchData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch("/api/danh-muc").then((res) => res.json()),
        fetch("/api/san-pham").then((res) => res.json()),
      ]);
      setCategories(catRes);
      setProducts(prodRes);
    } catch (err) {
      console.log("Lỗi khi lấy dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  
  const reviews = [
    {
      name: "Lan Phương",
      text: "Áo dài rất đẹp, chất lượng vải tuyệt vời!",
      img: "/Reviewer/271656042_640835917107390_6742996207362463849_n-down-1642744498-28-width900height1336.jpg",
    },
    {
      name: "Minh Thư",
      text: "Mẫu thiết kế rất tinh tế, may đo vừa vặn.",
      img: "/Reviewer/358618058-598075319158101-8248208660712459317-n.jpg",
    },
    {
      name: "Hoàng Nam",
      text: "Dịch vụ chuyên nghiệp, giao hàng nhanh.",
      img: "/Reviewer/chup-anh-ao-dai-nhung-truyen-thong-o-cac-dia-diem-dep.jpg",
    },
  ];

  const images = ["/hero/DALL·E 2025-03-04 14.17.51 - A luxurious and elegant traditional Vietnamese áo dài displayed on a mannequin, set in a grand royal setting. The áo dà.webp", "/hero/DALL·E 2025-03-04 14.19.48 - A luxurious and elegant traditional Vietnamese áo dài in an artistic setting. The background features a beautifully det.webp"];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const handleScroll = (categoryId: string, direction: "left" | "right") => {
    setScrollPositions((prev) => {
      const currentPos = prev[categoryId] || 0;
      const newPos = direction === "left" ? Math.max(currentPos - 1, 0) : currentPos + 1;
      return { ...prev, [categoryId]: newPos };
    });
  };
  return (
    <div className="min-h-screen mt-16">
      <div className="relative w-full h-screen">
      {/* Hình ảnh cửa hàng làm panel */}
      <div className="absolute inset-0">
        <Image
          src="/shop/DALL·E 2025-03-04 14.15.30 - A modern and elegant traditional Vietnamese áo dài store interior. The room has a warm, luxurious ambiance with wooden .webp" // Đặt đường dẫn đúng với ảnh cửa hàng của bạn
          alt="Cửa hàng"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-80" // Điều chỉnh độ mờ của ảnh
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50 p-6">
        <div className="text-white text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Nhà May Hoàng Kim</h1>
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
    
      {/* <section className="relative mt-24 m-16 h-screen rounded-3xl flex flex-col items-center justify-center text-center px-6">
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-3"
        >
          <h3 className="text-5xl text-[#c1121f]">
            May Đo Áo Dài Theo Yêu Cầu
          </h3>
          <p className="mt-4 text-lg max-w-2xl text-red-950">
            &quot;Chúng tôi mang đến những mẫu áo dài tinh tế, phù hợp với từng
            cá nhân. Đặt lịch ngay để sở hữu bộ áo dài ưng ý nhất.&quot;
          </p>
          <motion.div whileHover={{ scale: 1.1 }} className="mt-6">
            <Button className="bg-[#780000] text-white px-6 py-3 rounded-full hover:bg-[#6B0000] shadow-md">
              Tư Vấn Thiết Kế 
            </Button>
          </motion.div>
        </motion.div>
        
        <div className="relative mt-5 w-full h-auto overflow-hidden rounded-3xl">
          <img
            src={images[currentIndex]}
            alt="Áo dài"
            className="w-full h-full object-cover transition-all duration-500"
          />
          
          <button
            onClick={prevSlide}
            className="absolute top-1/2  left-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-opacity"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-opacity"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section> */}
        

        

      {/* Sản phẩm đặt may Section */}
      
      <div className="px-4  md:px-8 lg:px-12 pt-16 pb-6 space-y-10">
      <div className="text-center">
        <h3 className="text-4xl font-bold text-[#8B0000] mb-6">Sản phẩm của chúng tôi</h3>
        <p className="mt-4 text-lg px-36 text-red-950 w-full">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat sunt quibusdam natus unde repudiandae, voluptates a consequatur doloribus aperiam expedita eligendi fugit in quaerat voluptatum quas assumenda cupiditate recusandae porro!</p>
  
      </div>
        {loading ? (
          <Skeleton className="h-40 w-full rounded-lg" />
        ) : (
          sortedCategories.map((category) => {
            const categoryProducts = products.filter((p) => p.ma_danh_muc === category.ma_danh_muc);
            const startIndex = scrollPositions[category.ma_danh_muc] || 0;
            const visibleProducts = categoryProducts.slice(startIndex, startIndex + 3);

            return (
              <div
              key={category.ma_danh_muc}
              className="p-6 rounded-3xl grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-300"
            >
              {/* Ảnh danh mục */}
              <div className="relative w-full h-64 md:h-[355px] hover:shadow-xl rounded-lg overflow-hidden col-span-1 group">
                <Image
                  src={category.url_image}
                  alt={category.ten_danh_muc}
                  fill 
                  style={{ objectFit: "cover" }} 
                  className="rounded-lg transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent flex items-end p-4">
                  <h2 className="text-2xl font-bold text-yellow-100">{category.ten_danh_muc}</h2>
                </div>
              </div>
            
              {/* Danh sách sản phẩm */}
              <div className="col-span-1 lg:col-span-2 flex flex-col space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {visibleProducts.map((product) => (
                    <Card
                      key={product.ma_san_pham_dat_may}
                      className="min-w-[200px] border border-gray-300 hover:border-gray-500 transition-all duration-300 rounded-lg"
                    >
                      <CardContent className="relative w-full aspect-[4/3] rounded-t-lg overflow-hidden">
                        <Image
                          src={product.url_Image}
                          alt={product.ten_san_pham}
                          fill // ✅ Thay thế layout="fill"
                          style={{ objectFit: "cover" }} 
                          className="rounded-t-lg transition-transform duration-300 hover:scale-105"
                        />
                      </CardContent>
                      <div className="p-3">
                        <h3 className="text-lg text-[#780000] font-semibold">
                          {product.ten_san_pham}
                        </h3>
                        <p className={`text-lg ${product.gia_tien ? "text-[#003049]" : "text-gray-500"}`}>
                          {product.gia_tien ? `${product.gia_tien.toLocaleString()} VND` : "Giá liên hệ"}
                        </p>
                      </div>
                      <CardFooter className="flex justify-start gap-2 p-3">
                        <Button
                          onClick={()=>handelDetail(product.ma_danh_muc)}
                          variant="outline"
                          className="bg-[#003049] text-[#FDF0D5] hover:bg-neutral-300 transition-all duration-300"
                          size="sm"
                        >
                          Xem chi tiết
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-[#003049] text-[#FDF0D5] hover:bg-neutral-300 transition-all duration-300"
                          size="sm"
                        >
                          <FaCartArrowDown />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
            
                {/* Nút lướt trái/phải */}
                <div className="flex justify-center space-x-4 mt-2">
                  <Button
                    className="bg-gray-400 text-[#FDF0D5] rounded-full p-2 shadow-md hover:bg-gray-400 transition-all h-3 duration-300"
                    onClick={() => handleScroll(category.id, "left")}
                    disabled={startIndex === 0}
                  >
                    <TbArrowMoveLeft />
                  </Button>
                  <Button
                    className="bg-gray-300 text-[#FDF0D5] rounded-full p-2 shadow-md hover:bg-gray-400 transition-all h-3 duration-300"
                    onClick={() => handleScroll(category.id, "right")}
                    disabled={startIndex + 3 >= categoryProducts.length}
                  >
                    <TbArrowMoveRight />
                  </Button>
                </div>
              </div>
            </div>
            
            );
          })
        )}
      </div >
        {/* Video Section */}
        {/* <motion.section
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
            </motion.section> */}
        {/* Đánh giá Section */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="px-20 pt-12 pb-24 text-center "
          >
            <h2 className="text-4xl font-bold text-[#8B0000] mb-6">
              Khách Hàng Đánh Giá
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto italic mb-8">
              Hơn 1000 khách hàng đã tin tưởng và yêu thích sản phẩm của chúng tôi!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="p-6 bg-[#669BBC] rounded-xl shadow-lg text-center"
                >
                  <Image
                    src={review.img}
                    alt={review.name}
                    width={64}
                    height={64}
                    className="mx-auto rounded-full mb-4 shadow-md"
                  />

                  <p className="text-[#FDF0D5] italic">
                    &quot;{review.text}&quot;
                  </p>
                  <h3 className="mt-4 font-semibold text-lg text-[#003049]">
                    {review.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      
    </div>
  );
}
