import React from "react";

const WarrantyPolicy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Chính Sách Bảo Hành</h1>
      <p className="mb-4 text-gray-600 text-lg">Chúng tôi cam kết bảo hành sản phẩm để đảm bảo chất lượng tốt nhất cho khách hàng. Dưới đây là chính sách bảo hành:</p>
      
      <ul className="list-disc pl-6 space-y-4 text-gray-700 text-lg">
        <li className="bg-gray-100 p-3 rounded-md"><strong>Thời gian bảo hành:</strong> Sản phẩm được bảo hành trong vòng 6 tháng kể từ ngày mua.</li>
        <li className="bg-gray-100 p-3 rounded-md"><strong>Điều kiện bảo hành:</strong> Sản phẩm bị lỗi kỹ thuật do nhà sản xuất hoặc lỗi trong quá trình gia công.</li>
        <li className="bg-gray-100 p-3 rounded-md"><strong>Trường hợp không được bảo hành:</strong> Sản phẩm hư hỏng do sử dụng không đúng cách, tự ý sửa chữa hoặc do tác động bên ngoài.</li>
        <li className="bg-gray-100 p-3 rounded-md"><strong>Quy trình bảo hành:</strong> Liên hệ bộ phận hỗ trợ, cung cấp thông tin sản phẩm và ảnh sản phẩm, sau đó gửi sản phẩm về cửa hàng.</li>
        <li className="bg-gray-100 p-3 rounded-md"><strong>Thời gian xử lý:</strong> Bảo hành sẽ được xử lý trong vòng 7-14 ngày làm việc tùy vào mức độ hư hỏng.</li>
      </ul>
      
      <p className="mt-6 text-gray-600 text-lg">Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua số điện thoại hoặc email.</p>
    </div>
  );
};

export default WarrantyPolicy;
