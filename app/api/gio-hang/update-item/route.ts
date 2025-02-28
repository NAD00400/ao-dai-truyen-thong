import { NextResponse } from "next/server";
import {prisma} from "../../../lib/prisma"; // Đảm bảo prisma được cấu hình đúng

export async function PATCH(req: Request, { params }: { params: { gioHangId: string } }) {
  try {
    const { gioHangId } = params;
    const { itemId, newItemData } = await req.json(); // itemId là id của sản phẩm cần sửa, newItemData là dữ liệu mới

    // Tìm giỏ hàng của khách hàng
    const gioHang = await prisma.gioHang.findUnique({
      where: { id: gioHangId },
      include: {
        gioHangItems: true, // Bao gồm các item trong giỏ hàng
      }
    });

    if (!gioHang) {
      return NextResponse.json({ error: "Giỏ hàng không tồn tại" }, { status: 404 });
    }

    // Cập nhật item trong giỏ hàng
    const updatedItem = await prisma.gioHangItem.update({
      where: { id: itemId },
      data: newItemData,
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm trong giỏ hàng:", error);
    return NextResponse.json({ error: "Lỗi khi cập nhật sản phẩm trong giỏ hàng" }, { status: 500 });
  }
}
