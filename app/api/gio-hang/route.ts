import { NextResponse } from "next/server";
import {prisma} from "../../lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { khachHangId, sanPhamId, quantity, price } = data; // dữ liệu sản phẩm cần thêm

    // Tạo một item mới trong giỏ hàng
    const gioHangItem = await prisma.gioHangItem.create({
      data: {
        gioHangId: khachHangId, // Giả sử khachHangId là id của giỏ hàng
        sanPhamId: sanPhamId,
        quantity,
        price,
      }
    });

    // Kiểm tra xem giỏ hàng của khách hàng đã tồn tại chưa, nếu chưa tạo mới
    const gioHang = await prisma.gioHang.upsert({
      where: { khachHangId }, // Tìm giỏ hàng bằng khachHangId
      update: {},
      create: {
        khachHangId,
        gioHangItems: {
          connect: { id: gioHangItem.id },
        },
      },
    });

    return NextResponse.json(gioHang);
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    return NextResponse.json({ error: "Lỗi khi thêm sản phẩm vào giỏ hàng" }, { status: 500 });
  }
}
