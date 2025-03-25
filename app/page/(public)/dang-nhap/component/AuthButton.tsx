"use client";

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../../local stg/authStore";
import { auth } from "../../../../../lib/firebaseConfig";

export default function AuthButton() {
  const { setUser, setToken, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleLogin = async () => {
    if (loading) return; // Chặn spam click
    setLoading(true);

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

      toast.success("Đăng nhập thành công!", { autoClose: 1000 });

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      toast.error("Lỗi đăng nhập! Vui lòng thử lại.");
      console.error("Lỗi đăng nhập:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    logout();
    toast.info("Đã đăng xuất!",{ autoClose: 1000 });
    setTimeout(() => {
      router.push("/");
    }, 11500);
  };

  return (
    <div className="flex justify-center mt-2 gap-4">
      <ToastContainer />
      
      <button
        onClick={handleLogin}
        className={`cursor-pointer flex items-center justify-center w-16 h-16 rounded-full border ${
          loading ? "border-gray-400 opacity-50 cursor-not-allowed" : "border-gray-300 hover:shadow-lg transition-shadow"
        }`}
        disabled={loading}
      >
        {loading ? (
          <div className="w-6 h-6 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
        ) : (
          <FcGoogle size={32} />
        )}
      </button>

      {/* Nút đăng xuất (có thể bật lại nếu cần) */}
      <button
        onClick={handleLogout}
        className="cursor-pointer flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 hover:shadow-lg transition-shadow"
      >
        <FiLogOut size={32} className="text-red-600" />
      </button>
    </div>
  );
}
