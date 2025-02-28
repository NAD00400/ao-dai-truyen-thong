"use client"
import "./globals.css";
import { useLoadUser } from "./store/authStore";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useLoadUser();
  return (
    <html lang="en">
      <body
        
      >
        {children}
      </body>
    </html>
  );
}
