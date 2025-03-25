"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FaCartArrowDown } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/app/context/cartContext";
import ImagePanel from "@/components/ux/panel";

const PAGE_SIZE =6;
async function getProducts(slug: string) {
  const url = `/api/san-pham/slug/${slug}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    console.error("Fetch error:", res.status, res.statusText);
    return null;
  }
  return res.json();
}

const items = [
  {
    title: 'Áo Dài Thiên Cung',
    detai:"Tên này mang âm hưởng cung đình, gợi nhớ đến những cung điện cổ xưa với sự sang trọng và tráng lệ.",
    image:'/hero/DALL·E 2025-03-04 14.17.51 - A luxurious and elegant traditional Vietnamese áo dài displayed on a mannequin, set in a grand royal setting. The áo dà.webp',
    link: 'https://www.nike.com'
  },
  {
    title: 'Áo Dài Hồn Cổ',
    detai:"\"Hồn\" thể hiện linh hồn, tinh hoa của văn hóa truyền thống, còn \"Cổ\" nhấn mạnh nét đẹp của thời gian đã qua.",
    image:'/hero/DALL·E 2025-03-04 14.17.51 - A luxurious and elegant traditional Vietnamese áo dài displayed on a mannequin, set in a grand royal setting. The áo dà.webp',
    link: 'https://www.adidas.com'
  },
  {
    title: 'Áo Dài Ngọc Huyền',
    detai:"Ngọc gợi lên sự quý giá, tinh khiết; Huyền biểu trưng cho vẻ đẹp bí ẩn và sâu lắng của truyền thống.",
    image:'/hero/DALL·E 2025-03-04 14.17.51 - A luxurious and elegant traditional Vietnamese áo dài displayed on a mannequin, set in a grand royal setting. The áo dà.webp',
    link: 'https://www.puma.com'
  }
];

export default function CategoryPage() {
  const { addToCart } = useCart();
  const params = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const route = useRouter()
  const slug = Array.isArray(params.Slug) ? params.Slug[0] : params.Slug;
  
  const handelDetail=(id:string)=>{
    route.push(`/products/product-detail/${id}`);
  }

  useEffect(() => {
    if (!slug) return;

    getProducts(slug).then((data) => {
      if (data) setProducts(data);
      setLoading(false);
    });
  }, [slug]);
  
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const currentProducts = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="px-4 md:px-8 lg:px-12 pb-12 pt-24 space-y-6">
       <ImagePanel items={items} />
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[...Array(PAGE_SIZE)].map((_, i) => (
            <Skeleton key={i} className="h-60 w-full rounded-lg" />
          ))}
        </div>
      ) : currentProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {currentProducts.map((product) => (
            <Card key={product.id} className="border border-gray-300 hover:border-gray-500 transition-all duration-300 rounded-lg">
              <CardContent className="relative w-full aspect-[4/3] rounded-t-lg overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill // ✅ Thay thế layout="fill"
                  style={{ objectFit: "cover" }} 
                  className="rounded-t-lg transition-transform duration-300 hover:scale-105"
                />
              </CardContent>
              <div className="p-3  ">
                <h3 className=" text-[#780000] font-semibold">{product.name}</h3>
                <p className={` ${product.price ? "text-[#003049]" : "text-gray-500"}`}>
                  {product.price ? `${product.price.toLocaleString()} VND` : "Giá liên hệ"}
                </p>
              </div>
              <CardFooter className="flex justify-start gap-2 p-3">
                <Button variant="outline" onClick={()=>handelDetail(product.id)} className="bg-[#003049] text-[#FDF0D5] hover:bg-neutral-300 transition-all duration-300" size="sm">
                  Xem chi tiết
                </Button>
                <Button variant="outline" onClick={() => addToCart(product)} className="bg-[#003049] text-[#FDF0D5] hover:bg-neutral-300 transition-all duration-300" size="sm">
                  <FaCartArrowDown />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Không có sản phẩm nào</p>
      )}

      {/* PHÂN TRANG */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-all duration-300"
          >
            Trước
          </Button>
          <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-all duration-300"
          >
            Tiếp
          </Button>
        </div>
      )}
    </div>
  );
}
