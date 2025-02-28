import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../lib/prisma";

// Lấy danh sách mẫu thiết kế
export async function GET(req: NextRequest) {
  try {
    const mauThietKes = await prisma.mauThietKe.findMany();
    return NextResponse.json(mauThietKes);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi lấy danh sách mẫu thiết kế" }, { status: 500 });
  }
}

// Tạo mới một mẫu thiết kế
export async function POST(req: NextRequest) {
  try {
    const { createdBy, name, description, imageUrl } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Tên mẫu thiết kế là bắt buộc" }, { status: 400 });
    }

    const newMauThietKe = await prisma.mauThietKe.create({
      data: {
        createdBy,
        name,
        description,
        imageUrl,
      },
    });

    return NextResponse.json(newMauThietKe, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi tạo mẫu thiết kế" }, { status: 500 });
  }
}
