import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function POST(req: Request) {
    try {
      const { donHangId, paymentMethod, paymentType, amount } = await req.json();
  
      // Kiểm tra đơn hàng tồn tại
      const donHang = await prisma.donHang.findUnique({ where: { id: donHangId } });
      if (!donHang) {
        return NextResponse.json({ error: "Đơn hàng không tồn tại" }, { status: 404 });
      }
  
      // Tạo phiếu thanh toán
      const phieuThanhToan = await prisma.phieuThanhToan.create({
        data: {
          donHangId,
          paymentMethod,
          paymentType,
          amount,
        },
      });
  
      return NextResponse.json(phieuThanhToan);
    } catch (error) {
      console.error("Lỗi khi tạo phiếu thanh toán:", error);
      return NextResponse.json({ error: "Lỗi khi tạo phiếu thanh toán" }, { status: 500 });
    }
  }

  export async function PUT(req: Request) {
    try {
      const { donHangId, refundAmount } = await req.json();
  
      // Kiểm tra phiếu thanh toán
      const phieuThanhToan = await prisma.phieuThanhToan.findUnique({
        where: { donHangId },
      });
  
      if (!phieuThanhToan) {
        return NextResponse.json({ error: "Không tìm thấy phiếu thanh toán" }, { status: 404 });
      }
  
      if (phieuThanhToan.isRefunded) {
        return NextResponse.json({ error: "Tiền cọc đã được hoàn trước đó" }, { status: 400 });
      }
  
      // Cập nhật trạng thái hoàn tiền
      const updatedPhieuThanhToan = await prisma.phieuThanhToan.update({
        where: { donHangId },
        data: {
          isRefunded: true,
          refundAmount,
        },
      });
  
      return NextResponse.json(updatedPhieuThanhToan);
    } catch (error) {
      console.error("Lỗi khi hoàn tiền:", error);
      return NextResponse.json({ error: "Lỗi khi hoàn tiền" }, { status: 500 });
    }
  }
  