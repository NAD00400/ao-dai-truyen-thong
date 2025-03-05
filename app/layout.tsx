"use client"
import { Playfair_Display } from 'next/font/google';
import "./globals.css";
import { useLoadUser } from "./storage-local/authStore";
import Footer from "./Footer";
import Header from "./Header";
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--playfair-display', // Đặt tên cho CSS variable
});

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  useLoadUser();
  
  return (
    <html lang="en">
      <body className={`${playfairDisplay.className} font-variable bg-[#fdf0d5]`} >
        <Header></Header>
        {children }
        <Footer ></Footer>
      </body>
    </html>
  );
}
