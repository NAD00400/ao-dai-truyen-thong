import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// 📦 Lấy danh sách chi tiết đơn hàng theo `donHangId`
export async function GET(req: Request, { params }: { params: { donHangId: string } }) {
    try {
      const { donHangId } = params;
  
      const chiTietList = await prisma.chiTietDonHang.findMany({
        where: { donHangId },
        include: { sanPham: true }, // Lấy luôn thông tin sản phẩm
      });
  
      return NextResponse.json(chiTietList);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
      return NextResponse.json({ error: "Lỗi khi lấy chi tiết đơn hàng" }, { status: 500 });
    }
  }
  
  // ✏️ Cập nhật số lượng hoặc giá của chi tiết đơn hàng
  export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const { quantity, price } = await req.json();
  
      // Kiểm tra xem chi tiết đơn hàng có tồn tại không
      const chiTiet = await prisma.chiTietDonHang.findUnique({
        where: { id },
      });
      if (!chiTiet) {
        return NextResponse.json({ error: "Chi tiết đơn hàng không tồn tại" }, { status: 404 });
      }
  
      // Cập nhật dữ liệu
      const updatedChiTiet = await prisma.chiTietDonHang.update({
        where: { id },
        data: { quantity, price },
      });
  
      return NextResponse.json(updatedChiTiet);
    } catch (error) {
      console.error("Lỗi khi cập nhật chi tiết đơn hàng:", error);
      return NextResponse.json({ error: "Lỗi khi cập nhật chi tiết đơn hàng" }, { status: 500 });
    }
  }
  
  // ❌ Xóa một mục chi tiết đơn hàng
  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
  
      // Kiểm tra xem chi tiết đơn hàng có tồn tại không
      const chiTiet = await prisma.chiTietDonHang.findUnique({
        where: { id },
      });
      if (!chiTiet) {
        return NextResponse.json({ error: "Chi tiết đơn hàng không tồn tại" }, { status: 404 });
      }
  
      // Xóa mục chi tiết đơn hàng
      await prisma.chiTietDonHang.delete({ where: { id } });
  
      return NextResponse.json({ message: "Xóa thành công" });
    } catch (error) {
      console.error("Lỗi khi xóa chi tiết đơn hàng:", error);
      return NextResponse.json({ error: "Lỗi khi xóa chi tiết đơn hàng" }, { status: 500 });
    }
  }