import { NextResponse } from "next/server";
import admin from "../../../lib/firebase-admin";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Không có token!" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token nhận được:", token); // DEBUG: Kiểm tra token

    // ✅ Xác thực token với Firebase
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Thông tin user:", decodedToken); // DEBUG: Kiểm tra user từ Firebase

    return NextResponse.json({ user: decodedToken });
  } catch (error) {
    console.error("Lỗi xác thực token:", error);
    return NextResponse.json({ error: "Token không hợp lệ!" }, { status: 401 });
  }
}
