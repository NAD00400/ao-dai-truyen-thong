// app/api/gio-hang/[khachHangId]/route.ts

import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: Request, { params }: { params: { khachHangId: string } }) {
  try {
    const { khachHangId } = params;

    // Lấy giỏ hàng của khách hàng
    const gioHang = await prisma.gioHang.findUnique({
      where: { khachHangId },
    });

    if (!gioHang) {
      return NextResponse.json({ error: "Giỏ hàng không tồn tại!" }, { status: 404 });
    }

    return NextResponse.json(gioHang);
  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng của khách hàng:", error);
    return NextResponse.json({ error: "Lỗi khi lấy giỏ hàng" }, { status: 500 });
  }
}
