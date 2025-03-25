"use client";
import { useCart } from "@/app/context/cartContext";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MeasurementModal, {
  MeasurementFormData,
  MeasurementData,
} from "@/components/ui/MeasurementModal";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    phone: "",
    shippingMethod: "GHTK", // Mặc định giao hàng tiêu chuẩn
    paymentMethod: "ZaloPay",
  });
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    hamlet: "Khác",
    note: "",
    method: "ghtk",
  });
  const [measurementMapping, setMeasurementMapping] = useState<
    Record<string, MeasurementFormData>
  >({});
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (productId: string) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const handleSubmitMeasurement = (measurements: MeasurementData[]) => {
    if (selectedProductId && measurements.length > 0) {
      setMeasurementMapping((prev) => ({
        ...prev,
        [selectedProductId]: measurements[0],
      }));
    }
    handleCloseModal();
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckoutChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCheckoutData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order Details:", {
      checkoutData,
      shippingInfo,
      cart,
      total,
      measurementMapping,
    });
    alert("Đơn hàng đã được đặt thành công!");
    clearCart();
  };

  return (
    <div className="container mx-auto p-6 mt-24 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Giỏ hàng của bạn
      </h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-500 mb-4">Giỏ hàng của bạn trống.</p>
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cột sản phẩm trong giỏ */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-gray-50 rounded-md shadow-sm mb-4"
              >
                {/* --- Phần trái: Hình + Tên + Giá --- */}
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <p className="text-base font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Giá: {item.price.toLocaleString()}₫
                    </p>
                  </div>
                </div>

                {/* --- Phần phải: Số lượng + Số đo + Xóa --- */}
                <div className="flex items-center gap-4">
                  {/* Điều chỉnh số lượng */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  {/* Số đo */}
                  <div>
                    <button
                      onClick={() => handleOpenModal(item.id)}
                      className="px-3 py-1 bg-slate-400 text-white text-sm rounded-t-lg hover:bg-slate-900"
                    >
                      {measurementMapping[item.id] ? "Cập nhật số đo" : "Thêm số đo"}
                    </button>
                    {measurementMapping[item.id] && (
                      <div className="mt-1 p-1 bg-slate-400 rounded-b-lg text-xs text-white">
                        <p>Số đo: {measurementMapping[item.id].name}</p>
                        <p>Vòng ngực: {measurementMapping[item.id].chestSize}</p>
                        <p>Vòng eo: {measurementMapping[item.id].waistSize}</p>
                        {/* Thêm các số đo khác nếu cần */}
                      </div>
                    )}
                  </div>

                  {/* Nút xóa */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-2 py-1 bg-[#669BBC] text-white text-sm rounded hover:bg-[#003049]"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}

              <div className="flex justify-between items-center pt-4 border-t mt-4">
                <button
                  onClick={clearCart}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Xóa giỏ hàng
                </button>
                <div className="text-lg font-semibold">
                  Tổng cộng:{" "}
                  <span className="text-red-600">
                    {total.toLocaleString()}₫
                  </span>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Cột form thanh toán */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-white rounded-lg shadow"
            >
              <h2 className="text-2xl font-semibold mb-4">
                Thông tin giao hàng & Thanh toán
              </h2>
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Họ và tên</label>
                    <input
                      type="text"
                      name="name"
                      value={checkoutData.name}
                      onChange={handleCheckoutChange}
                      required
                      className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Số điện thoại</label>
                    <input
                      type="text"
                      name="phone"
                      value={checkoutData.phone}
                      onChange={handleCheckoutChange}
                      required
                      className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700">
                    Phương thức giao hàng
                  </label>
                  <select
                    name="shippingMethod"
                    value={checkoutData.shippingMethod}
                    onChange={handleCheckoutChange}
                    className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-600"
                  >
                    <option value="GHTK">
                      Giao hàng tiêu chuẩn (GHTK)
                    </option>
                    <option value="pickup">Nhận hàng tại cửa hàng</option>
                  </select>
                </div>
                {checkoutData.shippingMethod === "GHTK" && (
                  <div className="border p-4 rounded">
                    <h3 className="text-xl font-semibold mb-2">
                      Thông tin giao hàng
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Họ và tên"
                        value={shippingInfo.name}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            name: e.target.value,
                          })
                        }
                        className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-600"
                      />
                      <input
                        type="text"
                        placeholder="Số điện thoại"
                        value={shippingInfo.phone}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            phone: e.target.value,
                          })
                        }
                        className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-600"
                      />
                      <input
                        type="text"
                        placeholder="Tỉnh/Thành phố"
                        value={shippingInfo.province}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            province: e.target.value,
                          })
                        }
                        className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-600"
                      />
                      <input
                        type="text"
                        placeholder="Quận/Huyện"
                        value={shippingInfo.district}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            district: e.target.value,
                          })
                        }
                        className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-600"
                      />
                      <input
                        type="text"
                        placeholder="Phường/Xã"
                        value={shippingInfo.ward}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            ward: e.target.value,
                          })
                        }
                        className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-600"
                      />
                      <input
                        type="text"
                        placeholder="Địa chỉ cụ thể"
                        value={shippingInfo.address}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            address: e.target.value,
                          })
                        }
                        className="mt-1 w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-600"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-gray-700">
                    Phương thức thanh toán
                  </label>
                  <div className="flex space-x-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="ZaloPay"
                        checked={checkoutData.paymentMethod === "ZaloPay"}
                        onChange={handleCheckoutChange}
                        className="mr-2"
                      />
                      ZaloPay
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={checkoutData.paymentMethod === "bank"}
                        onChange={handleCheckoutChange}
                        className="mr-2"
                      />
                      Chuyển khoản
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={checkoutData.paymentMethod === "cash"}
                        onChange={handleCheckoutChange}
                        className="mr-2"
                      />
                      Tiền mặt
                    </label>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h3 className="text-xl font-semibold">Tóm tắt đơn hàng</h3>
                  <p className="mt-2">
                    Sản phẩm: {cart.length} sản phẩm
                  </p>
                  <p>
                    Tổng tiền: {total.toLocaleString()}₫
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Xác nhận đặt hàng
                </button>
              </form>
            </motion.div>
          </section>
        </div>
      )}
      {isModalOpen && (
        <MeasurementModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitMeasurement}
          initialMeasurements={
            selectedProductId && measurementMapping[selectedProductId]
              ? [measurementMapping[selectedProductId] as MeasurementData]
              : undefined
          }
        />
      )}
    </div>
  );
}
