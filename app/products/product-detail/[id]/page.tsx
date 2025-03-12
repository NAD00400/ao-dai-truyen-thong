"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/app/context/cartContext";

interface CustomProduct {
  id: string;
  name: string;
  description?: string;
  detailedDescription?: string;
  price: number;
  imageUrl?: string;
  size?: string;
  color?: string;
  customAttributes?: Record<string, any>;
  isAvailable: boolean;
  productionTime?: string;
  careInstructions?: string;
  categoryId: string;
  rating?: number;
  reviewCount?: number;
}

const ProductDetail = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState<CustomProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    if (!product?.id || !product?.name || product?.price === undefined) {
      console.error("Sản phẩm thiếu thông tin cần thiết!");
      return;
    }
  
    if (quantity > 0) {
      addToCart({
        id: product.id,
        name: product.name, 
        price: product.price,
        quantity ,
      });
    }
  };
  

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/custom-product/${id}`);
        if (!response.ok) throw new Error("Không thể tải sản phẩm");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError("Lỗi khi tải sản phẩm, vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="pt-24 pb-4 px-4 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#FDF0D5] p-6 rounded-xl shadow-lg">
          <Skeleton className="w-full h-[500] rounded-lg" />
          <div>
            <Skeleton className="h-8 w-3/4 rounded mb-4" />
            <Skeleton className="h-6 w-1/2 rounded mb-4" />
            <Skeleton className="h-6 w-1/3 rounded mb-4" />
            <Skeleton className="h-20 w-full rounded mb-4" />
            <div className="flex space-x-4">
              <Skeleton className="h-12 w-1/2 rounded" />
              <Skeleton className="h-12 w-1/2 rounded" />
            </div>
          </div>
        </div>
      </div>
    );

  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="pt-24  p-24 min-h-screen">
      {product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#fff] p-6 rounded-xl shadow-lg">
          <div className="relative">
            <Image src={product.imageUrl || "/placeholder.png"} alt={product.name} width={500} height={500} className="rounded-lg w-full" />
            <span className="absolute  top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-md text-sm">
              {product.isAvailable ? "Sản phẩm có sẵn" : "Sản phẩm đặt may"}
            </span>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#003049]">{product.name}</h1>
            
            <p className="text-xl text-[#C1121F] font-semibold mt-2">{product.price.toLocaleString()} VND</p>
            <p className="mt-4 text-gray-700">{product.description}</p>
            
            <p className="mt-4 ">
              {product.isAvailable ? (
                <span className="text-green-600 font-semibold text-lg">Sản phẩm có sẵn tại cửa hàng</span>
              ) : (<>
                <span className="text-[#669BBC] font-semibold text-lg">Sản phẩm đặt may - Thời gian may: {product.productionTime || "Không xác định"} / 1 bộ </span>
                <p className="mt-1 text-gray-700">trong tường hợp đơn hàng số lượng lớn sẽ được thông báo thời gian may và ưu đãi sau khi đặt may</p>
                </>
              )}
            </p>

            {product.size && (
              <div className="mt-6">
                <h3 className="font-semibold text-lg">Kích thước:</h3>
                <p className="text-gray-600">{product.size}</p>
              </div>
            )}

            {product.color && (
              <div className="mt-4">
                <h3 className="font-medium text-lg">Màu sắc: <span className="text-[#669BBC]">{product.color}</span></h3>
                {product.rating !== undefined && product.reviewCount !== undefined && (
                  <p className="text-lg text-gray-700 mt-1">⭐ {product.rating.toFixed(1)} / 5 ({product.reviewCount} đánh giá)</p>
                )}  
              </div>
            )}

            <div className="mt-6 flex flex-col gap-4 ">
             <div className=" flex gap-2">
             <div className="flex items-center border border-[#FDF0D5] bg-[#ffffff] rounded-xl">
                    <Button
                      className="bg-[#003049] border border-[#003049] px-3 py-2 text-lg rounded-tr-none rounded-br-none rounded-tl-xl rounded-bl-xl font-semibold"
                      onClick={handleDecrease}
                      disabled={quantity === 1}
                    >
                      -
                    </Button>
                    <span className=" px-4  text-lg">{quantity}</span>
                    <Button className="bg-[#003049] border border-[#003049] px-3 py-2 text-lg rounded-tl-none rounded-bl-none rounded-tr-xl rounded-br-xl font-semibold" onClick={handleIncrease}>
                      +
                    </Button>
                  </div>
                  <Button
                    className="bg-[#003049]  text-white w-full py-3 text-lg font-semibold"
                    onClick={handleAddToCart}
                  >
                    Thêm vào giỏ hàng
                  </Button>
             </div>
                {product.isAvailable ? (
                  <Button
                  className="bg-[#780000] text-white w-full py-3 text-lg font-semibold"
                  onClick={() => console.log("Đặt may sản phẩm", product)}
                >
                  Đặt mua
                </Button>
                ) : (
                <Button
                  className="bg-[#780000] text-white w-full py-3 text-lg font-semibold"
                  onClick={() => console.log("Đặt may sản phẩm", product)}
                >
                  Đặt may
                </Button>
              )}
          </div>
          <div className="relative mt-4 h-[215px]">
          <Image 
            src="/DALL·E_2025-03-03_14.26.00.webp" 
            alt="Ảnh 1" 
            width={400} 
            height={200} 
            className="rounded-lg object-cover w-full h-full" 
          />
          {/* Lớp phủ màu trắng */}
          <div className="absolute inset-0 bg-neutral-700 opacity-50 rounded-lg"></div>
          {/* Văn bản chồng lên */}
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
            Lorem, ipsum.
          </span>
        </div>


          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">Sản phẩm không tồn tại.</p>
      )}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#003049] mb-4">Hướng dẫn chọn size</h2>
        <p className="text-gray-700 mb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ipsum molestiae nihil voluptatum quas cupiditate nulla earum autem nesciunt. Iusto suscipit at quia ad corporis, consequuntur aliquam velit sequi numquam.
        </p>
        <div className=" my-4">
          <Image src="/size/1.png" alt="Hướng dẫn đo vòng ngực" width={200} height={200} className="rounded-lg w-1/2" />
        </div>
        <p className="text-gray-700 mb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ipsum molestiae nihil voluptatum quas cupiditate nulla earum autem nesciunt. Iusto suscipit at quia ad corporis, consequuntur aliquam velit sequi numquam.
        </p><div className=" my-4">
          <Image src="/size/3.png" alt="Hướng dẫn đo chiều dài áo" width={200} height={200} className="rounded-lg w-2/4" />
        </div>
        <p className="text-gray-700 mb-2">
          Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium a distinctio libero qui quaerat voluptates odio, obcaecati ducimus eligendi iure. consectetur adipisicing elit. Rem ipsum molestiae nihil voluptatum quas cupiditate nulla earum autem nesciunt. Iusto suscipit at quia ad corporis, consequuntur aliquam velit sequi numquam.
        </p>
        <p className="text-gray-700 mb-2">
          Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium a distinctio libero qui quaerat voluptates odio, obcaecati ducimus eligendi iure. consectetur adipisicing elit. Rem ipsum molestiae nihil voluptatum quas cupiditate nulla earum autem nesciunt. Iusto suscipit at quia ad corporis, consequuntur aliquam velit sequi numquam.
        </p>
        <div className=" my-4">
          <Image src="/size/2.png" alt="Hướng dẫn đo vòng ngực" width={200} height={200} className="rounded-lg w-1/2" />
        </div>
        <p className="text-gray-700 mb-2">
          Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium a distinctio libero qui quaerat voluptates odio, obcaecati ducimus eligendi iure. consectetur adipisicing elit. Rem ipsum molestiae nihil voluptatum quas cupiditate nulla earum autem nesciunt. Iusto suscipit at quia ad corporis, consequuntur aliquam velit sequi numquam.
        </p>
        
        

        
        
      </div>
    </div>
    
  );
};

export default ProductDetail;
