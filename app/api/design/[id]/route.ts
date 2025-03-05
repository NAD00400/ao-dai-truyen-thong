import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../lib/prisma";

// Lấy chi tiết một mẫu thiết kế
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const mauThietKe = await prisma.mauThietKe.findUnique({ where: { id } });

    if (!mauThietKe) {
      return NextResponse.json({ error: "Không tìm thấy mẫu thiết kế" }, { status: 404 });
    }

    return NextResponse.json(mauThietKe);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi lấy mẫu thiết kế" }, { status: 500 });
  }
}

// Cập nhật một mẫu thiết kế
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, description, imageUrl } = await req.json();

    const updatedMauThietKe = await prisma.mauThietKe.update({
      where: { id },
      data: { name, description, imageUrl },
    });

    return NextResponse.json(updatedMauThietKe);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi cập nhật mẫu thiết kế" }, { status: 500 });
  }
}

// Xóa một mẫu thiết kế
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await prisma.mauThietKe.delete({ where: { id } });

    return NextResponse.json({ message: "Xóa mẫu thiết kế thành công" });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi xóa mẫu thiết kế" }, { status: 500 });
  }
}
