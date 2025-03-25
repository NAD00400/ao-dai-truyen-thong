import { NextResponse } from "next/server";
import {prisma} from "../../../lib/prisma"; // Đảm bảo prisma được cấu hình đúng

export async function DELETE(req: Request, { params }: { params: { gioHangId: string } }) {
  try {
    const { gioHangId } = params;
    const { itemId } = await req.json(); // itemId là id của sản phẩm muốn xóa trong giỏ hàng

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

    // Xóa item khỏi giỏ hàng
    await prisma.gioHangItem.delete({
      where: { id: itemId }, // Xóa item theo id
    });

    return NextResponse.json({ message: "Sản phẩm đã được xóa khỏi giỏ hàng" });
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm trong giỏ hàng:", error);
    return NextResponse.json({ error: "Lỗi khi xóa sản phẩm trong giỏ hàng" }, { status: 500 });
  }
}
