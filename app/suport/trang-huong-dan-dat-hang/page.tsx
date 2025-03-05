import React from "react";

const OrderGuide: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Hướng Dẫn Đặt Hàng</h1>
      <p className="mb-4 text-gray-600 text-lg">Dưới đây là các bước để đặt may áo dài trên trang web của chúng tôi:</p>
      
      <ol className="list-decimal pl-6 space-y-4 text-gray-700 text-lg">
        <li className="bg-gray-100 p-3 rounded-md"><strong>Chọn mẫu áo dài:</strong> Duyệt danh mục sản phẩm và chọn mẫu yêu thích.</li>
        <li className="bg-gray-100 p-3 rounded-md"><strong>Nhập số đo:</strong> Cung cấp số đo của bạn hoặc đặt lịch hẹn để lấy số đo tại cửa hàng.</li>
        <li className="bg-gray-100 p-3 rounded-md"><strong>Chọn vải:</strong> Chọn loại vải có sẵn hoặc gửi vải riêng.</li>
        <li className="bg-gray-100 p-3 rounded-md"><strong>Thêm vào giỏ hàng:</strong> Kiểm tra thông tin và xác nhận đặt hàng.</li>
        <li className="bg-gray-100 p-3 rounded-md"><strong>Thanh toán:</strong> Chọn phương thức thanh toán (ZaloPay, chuyển khoản, hoặc tiền mặt).</li>
        <li className="bg-gray-100 p-3 rounded-md"><strong>Xác nhận đơn hàng:</strong> Hệ thống sẽ gửi email xác nhận và cập nhật trạng thái đơn hàng.</li>
        <li className="bg-gray-100 p-3 rounded-md"><strong>Giao hàng:</strong> Theo dõi trạng thái giao hàng qua Giao Hàng Tiết Kiệm.</li>
      </ol>
      
      <p className="mt-6 text-gray-600 text-lg">Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua số điện thoại hoặc email.</p>
    </div>
  );
};

export default OrderGuide;