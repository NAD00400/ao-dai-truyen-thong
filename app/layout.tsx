"use client";
import { usePathname } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import { useLoadUser } from "./(public)/storage-local/authStore";
import Footer from "./Footer";
import "./globals.css";
import { default as Header, default as RadialMenu } from "./Header";
import { CartProvider } from "./context/cartContext";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--playfair-display",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useLoadUser();
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  // Kiểm tra nếu đang ở trong (protected) thì không hiển thị Header/Footer
  const isAdmin = pathname.startsWith("/dashboard") || pathname.startsWith("/appointments")|| pathname.startsWith("/invoices")|| pathname.startsWith("/orders")|| pathname.startsWith("/products")|| pathname.startsWith("/customers");

  return (
    <html lang="en" className={playfairDisplay.className}>
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
