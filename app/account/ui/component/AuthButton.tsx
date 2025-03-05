"use client";

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { auth } from "../../../lib/firebaseConfig";
import { useAuthStore } from "../../../storage-local/authStore";

export default function AuthButton() {
  const { setUser, setToken, logout } = useAuthStore();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) throw new Error("Lỗi đăng nhập!");

      const user = await res.json();
      setUser(user);
      setToken(token);
      console.log("User từ API:", user);
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    logout();
    console.log("Đã đăng xuất");
  };

  return (
    <div className="flex justify-center mt-2 gap-4">
      {/* Icon đăng nhập bằng Google */}
      <div
        onClick={handleLogin}
        className="cursor-pointer flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 hover:shadow-lg transition-shadow"
      >
        <FcGoogle size={32} />
      </div>
      {/* Icon đăng xuất */}
      {/* <div
        onClick={handleLogout}
        className="cursor-pointer flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 hover:shadow-lg transition-shadow"
      >
        <FiLogOut size={32} className="text-red-600" />
      </div> */}
    </div>
  );
}
