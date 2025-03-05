import React from "react";
import { Mail, Phone } from "lucide-react";

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Liên Hệ</h1>
      <p className="mb-4 text-gray-600 text-lg text-center">
        Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua các kênh dưới đây.
      </p>
      
      <div className="space-y-4">
        <div className="flex items-center bg-gray-100 p-4 rounded-md">
          <Mail className="w-6 h-6 text-gray-700 mr-3" />
          <span className="text-gray-700 text-lg">Email: support@aodai.vn</span>
        </div>
        <div className="flex items-center bg-gray-100 p-4 rounded-md">
          <Phone className="w-6 h-6 text-gray-700 mr-3" />
          <span className="text-gray-700 text-lg">Số điện thoại: 0123 456 789</span>
        </div>
      </div>
      
      <form className="mt-6 space-y-4">
        <input 
          type="text" 
          placeholder="Họ và tên" 
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <textarea 
          placeholder="Nội dung tin nhắn" 
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 h-32"
        ></textarea>
        <button 
          type="submit" 
          className="w-full bg-gray-800 text-white p-3 rounded-md hover:bg-gray-900 transition"
        >
          Gửi tin nhắn
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
