// app/auth/page.tsx

import AuthButton from "./ui/component/AuthButton";

export default function AuthPage() {
  return (
        <>
          <h1 className="text-2xl font-bold mb-6 text-center text-[#780000]">
            Đăng nhập
          </h1>
          <form className="space-y-4">
            <div>
              <label className="block text-[#003049] font-medium">Email</label>
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
  
            <div>
              <label className="block text-[#003049] font-medium">Mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-[#669BBC] text-white py-2 rounded-lg hover:bg-[#C1121F] transition"
            >
              Đăng nhập
            </button>
          </form>
  
          {/* Hoặc đăng nhập bằng Google */}
          
            <div className="mt-4 text-center">
              {/* <p className="text-gray-600">Hoặc</p> */}
              <AuthButton />
            </div>
    
            {/* Link quên mật khẩu */}
            <div className="mt-4 text-center">
              <a href="#" className="text-blue-600 hover:underline text-sm">
                Quên mật khẩu?
              </a>
            </div>
        </>
        
    

  );
}
