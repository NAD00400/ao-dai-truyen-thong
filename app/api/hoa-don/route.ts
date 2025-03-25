import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

// Tạo thanh toán cho đơn hàng
export async function POST(req: Request) {
  try {
    const { donHangId, paymentMethod, paymentStatus, paymentType, transactionId } = await req.json();

    // Kiểm tra nếu đơn hàng đã có thông tin thanh toán
    const existingPayment = await prisma.thanhToan.findUnique({
      where: { donHangId },
    });

    if (existingPayment) {
      return NextResponse.json({ error: "Đơn hàng này đã có thông tin thanh toán!" }, { status: 400 });
    }

    const newPayment = await prisma.thanhToan.create({
      data: {
        donHangId,
        paymentMethod,
        paymentStatus,
        paymentType,
        transactionId,
      },
    });

    return NextResponse.json(newPayment);
  } catch (error) {
    console.error("Lỗi khi tạo thanh toán:", error);
    return NextResponse.json({ error: "Lỗi khi tạo thanh toán" }, { status: 500 });
  }
}

  export async function GET(req: Request) {
    try {
      const payments = await prisma.thanhToan.findMany();
  
      return NextResponse.json(payments);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thanh toán:", error);
      return NextResponse.json({ error: "Lỗi khi lấy danh sách thanh toán" }, { status: 500 });
    }
  }
  