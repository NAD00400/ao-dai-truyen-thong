import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: Request, { params }: { params: { donHangId: string } }) {
    try {
      const { donHangId } = params;
  
      const payment = await prisma.thanhToan.findUnique({
        where: { donHangId },
      });
  
      if (!payment) {
        return NextResponse.json({ error: "Không tìm thấy thông tin thanh toán cho đơn hàng này" }, { status: 404 });
      }
  
      return NextResponse.json(payment);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin thanh toán:", error);
      return NextResponse.json({ error: "Lỗi khi lấy thông tin thanh toán" }, { status: 500 });
    }
  }
  
  export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const { paymentMethod, paymentStatus, paymentType, transactionId } = await req.json();
  
      const updatedPayment = await prisma.thanhToan.update({
        where: { id },
        data: {
          paymentMethod,
          paymentStatus,
          paymentType,
          transactionId,
        },
      });
  
      return NextResponse.json(updatedPayment);
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin thanh toán:", error);
      return NextResponse.json({ error: "Lỗi khi cập nhật thông tin thanh toán" }, { status: 500 });
    }
  }
  export async function DELETE(req: Request, { params }: { params: { donHangId: string } }) {
    try {
      const { donHangId } = params;
  
      const deletedPayment = await prisma.thanhToan.delete({
        where: { donHangId },
      });
  
      return NextResponse.json(deletedPayment);
    } catch (error) {
      console.error("Lỗi khi xóa thông tin thanh toán:", error);
      return NextResponse.json({ error: "Lỗi khi xóa thông tin thanh toán" }, { status: 500 });
    }
  }