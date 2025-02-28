import { NextResponse } from 'next/server'
import {prisma} from '../../lib/prisma'  // Đảm bảo rằng bạn đã cấu hình Prisma client đúng cách.

export async function GET() {
  try {
    // Lấy tất cả đơn hàng
    const donHangs = await prisma.donHang.findMany({
      include: {
        khachHang: true, // Có thể bao gồm các quan hệ nếu cần
        chiTietDonHangs: true
      }
    })
    return NextResponse.json(donHangs)
  } catch (error) {
    return NextResponse.error()
  }
}
//thêm
export async function POST(req: Request) {
    try {
      const { khachHangId, soDoKhachHangId, diaChiGiaoHang, phuongThucThanhToan, ghiChu, vouchers, thanhToanThanhCong, phiGiaoHang, sanPhamList } = await req.json();
      
      // Kiểm tra danh sách sản phẩm có trống không
      if (!sanPhamList || sanPhamList.length === 0) {
        return NextResponse.json({ error: "Danh sách sản phẩm không được trống" }, { status: 400 });
      }
  
      // Tính tổng tiền đơn hàng
      const totalAmount = sanPhamList.reduce((total: number, sp: { price: number; quantity: number }) => total + sp.price * sp.quantity, 0) + (phiGiaoHang || 0);
  
      // Tạo đơn hàng
      const donHang = await prisma.donHang.create({
        data: {
          khachHangId,
          soDoKhachHangId,
          orderDate: new Date(),
          status: "PENDING", // Đơn hàng mới tạo sẽ luôn ở trạng thái chờ
          totalAmount,
          diaChiGiaoHang,
          phuongThucThanhToan,
          ghiChu,
          vouchers,
          thanhToanThanhCong: thanhToanThanhCong || false,
          phiGiaoHang: phiGiaoHang || 0,
        },
      });
  
      // Tạo chi tiết đơn hàng
      await prisma.chiTietDonHang.createMany({
        data: sanPhamList.map((sp: { sanPhamId: any; quantity: any; price: any }) => ({
          donHangId: donHang.id,
          sanPhamId: sp.sanPhamId,
          quantity: sp.quantity,
          price: sp.price,
        })),
      });
  
      return NextResponse.json({ message: "Tạo đơn hàng thành công", donHang });
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      return NextResponse.json({ error: "Lỗi khi tạo đơn hàng" }, { status: 500 });
    }
  }
  
// sửa
export async function PUT(req: Request) {
    try {
      const data = await req.json();
  
      // Kiểm tra xem đơn hàng có tồn tại không
      const donHangExists = await prisma.donHang.findUnique({
        where: { id: data.id },
      });
  
      if (!donHangExists) {
        return NextResponse.json({ error: "Đơn hàng không tồn tại" }, { status: 404 });
      }
  
      // Cập nhật đơn hàng
      const updatedDonHang = await prisma.donHang.update({
        where: { id: data.id },
        data: {
          status: data.status,
          totalAmount: data.totalAmount,
          diaChiGiaoHang: data.diaChiGiaoHang,
          phuongThucThanhToan: data.phuongThucThanhToan,
          ghiChu: data.ghiChu,
          vouchers: data.vouchers,
          thanhToanThanhCong: data.thanhToanThanhCong,
          phiGiaoHang: data.phiGiaoHang,
        },
      });
  
      return NextResponse.json({ message: "Cập nhật đơn hàng thành công", updatedDonHang });
    } catch (error) {
      console.error("Lỗi khi cập nhật đơn hàng:", error);
      return NextResponse.json({ error: "Lỗi khi cập nhật đơn hàng" }, { status: 500 });
    }
  }
  
//xóa
export async function DELETE(req: Request) {
    try {
      const { id } = await req.json();
  
      // Kiểm tra xem đơn hàng có tồn tại không
      const donHangExists = await prisma.donHang.findUnique({
        where: { id },
      });
  
      if (!donHangExists) {
        return NextResponse.json({ error: "Đơn hàng không tồn tại hoặc đã bị xóa" }, { status: 404 });
      }
  
      // Xóa đơn hàng
      await prisma.donHang.delete({
        where: { id },
      });
  
      return NextResponse.json({ message: "Xóa đơn hàng thành công" });
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
      return NextResponse.json({ error: "Lỗi khi xóa đơn hàng" }, { status: 500 });
    }
  }
  
