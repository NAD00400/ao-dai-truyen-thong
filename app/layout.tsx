"use client";
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

export default function RootLayout({children,}: {children: React.ReactNode;}) {

  useLoadUser(); 

  return (
      <html lang="en" className={playfairDisplay.className}>
        <body className="font-variable bg-[#fdf0d5]">
        <CartProvider>
          <Header />
          <RadialMenu/>
            {children}          
          <Footer />
          </CartProvider>
        </body>
      </html>
  );
}
