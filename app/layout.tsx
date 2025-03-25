"use client";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { CartProvider } from "./context/cartContext";
import Footer from "./Footer";
import "./globals.css";
import { default as Header, default as RadialMenu } from "./Header";
import { useLoadUser } from "./page/(public)/local stg/authStore";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter-font",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useLoadUser();
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  // Kiểm tra nếu đang ở trong (protected) thì không hiển thị Header/Footer
  const isAdmin = pathname.startsWith("/dashboard") || pathname.startsWith("/appointments")|| pathname.startsWith("/invoices")|| pathname.startsWith("/orders")|| pathname.startsWith("/products")|| pathname.startsWith("/customers");

  return (
    <html lang="en" className={inter.className}>
      <body className="font-variable bg-[#fdf0d5]">
        <CartProvider>
          {!isAdmin && <Header />}
          {!isAdmin && <RadialMenu />}
          {children}
          {!isAdmin && <Footer />}
        </CartProvider>
      </body>
    </html>
  );
}
