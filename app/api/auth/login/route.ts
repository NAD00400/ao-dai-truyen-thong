import { NextResponse } from "next/server";
import admin from "../../../../lib/firebase-admin";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    // Xác thực token với Firebase
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Tìm User dựa trên Firebase UID
    let user: any = await prisma.nguoi_dung.findUnique({
      where: { firebaseId: decodedToken.uid },
      include: {
        khach_hang_nguoi_dung_ma_khach_hangTokhach_hang: true,
      },
    });

    if (!user) {
      // Nếu chưa có user, tạo mới
      user = await prisma.nguoi_dung.create({
        data: {
          firebaseId: decodedToken.uid,
          email_nguoi_dung: decodedToken.email ?? "",
          ten_nguoi_dung: decodedToken.name || "",
          link_anh_dai_dien: decodedToken.picture || "",
          vai_tro: "KHACH_HANG", // Mặc định là khách hàng, sau này có thể chỉnh sửa
          ma_khach_hang: null, // Có thể để null
          khach_hang_nguoi_dung_ma_khach_hangTokhach_hang: {
            create: {
              so_dien_thoai: "",
              dia_chi_khach_hang: "",
            },
          },
        },
        include: {
          khach_hang_nguoi_dung_ma_khach_hangTokhach_hang: true,
        },
      });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return NextResponse.json({ error: "Lỗi đăng nhập!" }, { status: 500 });
  }
}
