import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../lib/prisma"; // Kết nối Prisma

// Lấy danh sách tất cả các loại vải
export async function GET() {
  try {
    const vaiList = await prisma.vai.findMany();
    return NextResponse.json(vaiList, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi lấy danh sách vải" }, { status: 500 });
  }
}

// Tạo vải mới
export async function POST(req: NextRequest) {
  try {
    const { name, description, pricePerMeter } = await req.json();

    if (!name || !pricePerMeter) {
      return NextResponse.json({ error: "Tên và giá vải là bắt buộc" }, { status: 400 });
    }

    const newVai = await prisma.vai.create({
      data: { name, description, pricePerMeter },
    });

    return NextResponse.json(newVai, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi tạo vải" }, { status: 500 });
  }
}
