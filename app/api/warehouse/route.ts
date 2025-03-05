import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Lấy danh sách kho vải
export async function GET() {
  try {
    const khoVaiList = await prisma.kho.findMany({
      include: { vai: true },
    });
    return NextResponse.json(khoVaiList);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi lấy danh sách kho vải" }, { status: 500 });
  }
}

// Thêm kho vải mới
export async function POST(req: Request) {
  try {
    const { vaiId, quantity, location } = await req.json();
    const newKhoVai = await prisma.kho.create({
      data: { vaiId, quantity, location },
    });
    return NextResponse.json(newKhoVai);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi thêm kho vải" }, { status: 500 });
  }
}

// Lấy chi tiết kho vải theo ID
export async function GET_BY_ID(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    const khoVai = await prisma.kho.findUnique({
      where: { id },
      include: { vai: true },
    });
    if (!khoVai) {
      return NextResponse.json({ error: "Kho vải không tồn tại" }, { status: 404 });
    }
    return NextResponse.json(khoVai);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi lấy kho vải" }, { status: 500 });
  }
}

// Cập nhật kho vải
export async function PUT(req: Request) {
  try {
    const { id, vaiId, quantity, location } = await req.json();
    const updatedKhoVai = await prisma.kho.update({
      where: { id },
      data: { vaiId, quantity, location },
    });
    return NextResponse.json(updatedKhoVai);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi cập nhật kho vải" }, { status: 500 });
  }
}

// Xóa kho vải
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    await prisma.kho.delete({ where: { id } });
    return NextResponse.json({ message: "Xóa kho vải thành công" });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi khi xóa kho vải" }, { status: 500 });
  }
}
