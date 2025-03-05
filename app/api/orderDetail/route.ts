import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

// 🛒 Thêm sản phẩm vào chi tiết đơn hàng
export async function POST(req: Request) {
  try {
    const { donHangId, sanPhamId, quantity, price } = await req.json();

    // Kiểm tra xem đơn hàng có tồn tại không
    const donHang = await prisma.donHang.findUnique({
      where: { id: donHangId },
    });
    if (!donHang) {
      return NextResponse.json({ error: "Đơn hàng không tồn tại" }, { status: 404 });
    }

    // Kiểm tra xem sản phẩm có tồn tại không
    const sanPham = await prisma.sanPhamDatMay.findUnique({
      where: { id: sanPhamId },
    });
    if (!sanPham) {
      return NextResponse.json({ error: "Sản phẩm không tồn tại" }, { status: 404 });
    }

    // Thêm vào chi tiết đơn hàng
    const newChiTiet = await prisma.chiTietDonHang.create({
      data: { donHangId, sanPhamId, quantity, price },
    });

    return NextResponse.json(newChiTiet);
  } catch (error) {
    console.error("Lỗi khi thêm chi tiết đơn hàng:", error);
    return NextResponse.json({ error: "Lỗi khi thêm chi tiết đơn hàng" }, { status: 500 });
  }
}


// 🔄 Xóa toàn bộ chi tiết đơn hàng khi hủy đơn
export async function DELETE_ALL(req: Request, { params }: { params: { donHangId: string } }) {
  try {
    const { donHangId } = params;

    // Kiểm tra xem đơn hàng có tồn tại không
    const donHang = await prisma.donHang.findUnique({
      where: { id: donHangId },
    });
    if (!donHang) {
      return NextResponse.json({ error: "Đơn hàng không tồn tại" }, { status: 404 });
    }

    // Xóa tất cả chi tiết đơn hàng liên quan
    await prisma.chiTietDonHang.deleteMany({
      where: { donHangId },
    });

    return NextResponse.json({ message: "Xóa tất cả chi tiết đơn hàng thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa tất cả chi tiết đơn hàng:", error);
    return NextResponse.json({ error: "Lỗi khi xóa tất cả chi tiết đơn hàng" }, { status: 500 });
  }
}
