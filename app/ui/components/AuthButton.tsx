"use client";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import { useAuthStore } from "../../store/authStore";

export default function AuthButton() {
  const { setUser, setToken, logout } = useAuthStore();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      // Gửi token lên API backend để xác thực
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) throw new Error("Lỗi đăng nhập!");

      const user = await res.json();
      setUser(user);  // Lưu user vào Zustand
      setToken(token); // Lưu token vào Zustand + localStorage

      console.log("User từ API:", user);
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    logout(); // Xóa user & token khỏi Zustand + localStorage
    console.log("Đã đăng xuất");
  };

  return (
    <div>
      <button onClick={handleLogin} className="bg-blue-950">Đăng nhập bằng Google</button>
      <button onClick={handleLogout} className="bg-red-950">Đăng xuất</button>
    </div>
  );
}
