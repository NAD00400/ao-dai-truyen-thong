import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

// Lấy danh sách sản phẩm
export async function GET() {
  try {
    const products = await prisma.sanPhamDatMay.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi lấy danh sách sản phẩm" }, { status: 500 });
  }
}

// Tạo sản phẩm mới
export async function POST(req: Request) {
  try {
    const { name, description, price, imageUrl } = await req.json();
    const newProduct = await prisma.sanPhamDatMay.create({
      data: { name, description, price, imageUrl },
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi tạo sản phẩm" }, { status: 500 });
  }
}

