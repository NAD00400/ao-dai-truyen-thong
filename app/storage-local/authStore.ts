import { create } from "zustand";
import { useEffect } from "react";

interface AuthState {
  user: any | null;
  token: string | null;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token); // ✅ Lưu vào localStorage chỉ trên client
    }
    set({ token });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    set({ user: null, token: null });
  },
}));

export const useLoadUser = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.user) {
              setUser(data.user);
              setToken(token);
            } else {
              console.error("Token không hợp lệ!");
              localStorage.removeItem("token"); // Xóa token nếu không hợp lệ
            }
          })
          .catch((error) => console.error("Lỗi khi load user:", error));
      }
    }
  }, [setUser, setToken]);
};
