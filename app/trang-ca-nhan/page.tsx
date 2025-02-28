"use client"
import { useAuthStore } from "../store/authStore";

export default function UserProfile() {
    const { user } = useAuthStore();
    if (!user) return <p>Bạn chưa đăng nhập</p>;
    console.log("trang ca nhan ",user);
    
    return <p>Xin chào, {user.fullName || user.email}!</p>;
}
