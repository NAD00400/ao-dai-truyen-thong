import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import admin from "../../../lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    console.log("🛠️ Token received:", token);

    const decodedToken = await admin.auth().verifyIdToken(token);
    

    let user = await prisma.user.findUnique({
      where: { firebaseId: decodedToken.uid },
    });

    if (!user) {
      
      user = await prisma.user.create({
        data: {
          firebaseId: decodedToken.uid,
          email: decodedToken.email ?? "",
          fullName: decodedToken.name || "",
          avatar: decodedToken.picture || "",
          role: "CUSTOMER",
        },
      });
    }
    return NextResponse.json({ user });
  } catch (error) {    
    return NextResponse.json({ error: "Lỗi đăng nhập!" }, { status: 500 });
  }
}