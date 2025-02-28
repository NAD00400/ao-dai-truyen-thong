import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
// Lấy chi tiết sản phẩm theo ID
export async function GET_BY_ID(req: Request, { params }: { params: { id: string } }) {
    try {
      const product = await prisma.sanPhamDatMay.findUnique({ where: { id: params.id } });
      if (!product) return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
      return NextResponse.json(product, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Lỗi lấy sản phẩm" }, { status: 500 });
    }
  }
  
  // Cập nhật sản phẩm
  export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      const { name, description, price, imageUrl } = await req.json();
      const updatedProduct = await prisma.sanPhamDatMay.update({
        where: { id: params.id },
        data: { name, description, price, imageUrl },
      });
      return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Lỗi cập nhật sản phẩm" }, { status: 500 });
    }
  }
  
  // Xóa sản phẩm
  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      await prisma.sanPhamDatMay.delete({ where: { id: params.id } });
      return NextResponse.json({ message: "Xóa sản phẩm thành công" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Lỗi xóa sản phẩm" }, { status: 500 });
    }
  }