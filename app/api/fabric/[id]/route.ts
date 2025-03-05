import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../lib/prisma"; // Kết nối Prisma

// Lấy thông tin chi tiết một loại vải
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const vai = await prisma.vai.findUnique({
      where: { id: params.id },
    });

    if (!vai) {
      return NextResponse.json({ error: "Vải không tồn tại" }, { status: 404 });
    }

    return NextResponse.json(vai, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi lấy thông tin vải" }, { status: 500 });
  }
}

// Cập nhật thông tin vải
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, description, pricePerMeter } = await req.json();

    const updatedVai = await prisma.vai.update({
      where: { id: params.id },
      data: { name, description, pricePerMeter },
    });

    return NextResponse.json(updatedVai, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi cập nhật vải" }, { status: 500 });
  }
}

// Xóa vải
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.vai.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Xóa vải thành công" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi xóa vải" }, { status: 500 });
  }
}
