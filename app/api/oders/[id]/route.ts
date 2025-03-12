import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// LẤY THÔNG TIN ĐƠN HÀNG CỤ THỂ
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error retrieving order:", error);
    return NextResponse.json({ error: "Error retrieving order" }, { status: 500 });
  }
}

// CẬP NHẬT ĐƠN HÀNG
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const body = await req.json();
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: body, // Cập nhật các trường được gửi lên
    });
    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Error updating order" }, { status: 500 });
  }
}

// XOÁ ĐƠN HÀNG
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await prisma.order.delete({ where: { id } });
    return NextResponse.json({ message: "Order deleted successfully" }, { status: 204 });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ error: "Error deleting order" }, { status: 500 });
  }
}
