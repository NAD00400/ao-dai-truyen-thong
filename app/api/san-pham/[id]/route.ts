import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma"; // Đảm bảo import đúng Prisma

// Lấy sản phẩm theo ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });

    const product = await prisma.san_pham_dat_may.findUnique({
      where: { ma_san_pham_dat_may: id },
      include: { danh_muc: true },
    });

    if (!product) return NextResponse.json({ error: "Sản phẩm không tồn tại" }, { status: 404 });

    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    console.error("Lỗi server:", error);
    return NextResponse.json(
      { error: "Lỗi server", details: error instanceof Error ? error.message : "Lỗi không xác định" },
      { status: 500 }
    );
  }
}

// Cập nhật sản phẩm
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });

    const body = await req.json();
    const { name, description, price, categoryId, isAvailable, ...rest } = body;

    const updatedProduct = await prisma.san_pham_dat_may.update({
      where: { ma_san_pham_dat_may: id },
      data: { name, description, price, categoryId, isAvailable, ...rest },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: any) {
    console.error("Lỗi cập nhật:", error);
    return NextResponse.json(
      { error: "Lỗi cập nhật sản phẩm", details: error instanceof Error ? error.message : "Lỗi không xác định" },
      { status: 500 }
    );
  }
}

// Xóa sản phẩm
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });

    const existingProduct = await prisma.san_pham_dat_may.findUnique({ where: { ma_san_pham_dat_may:id } });
    if (!existingProduct) return NextResponse.json({ error: "Sản phẩm không tồn tại" }, { status: 404 });

    await prisma.san_pham_dat_may.delete({ where: { ma_san_pham_dat_may:id} });

    return NextResponse.json({ message: "Sản phẩm đã bị xóa" }, { status: 200 });
  } catch (error: any) {
    console.error("Lỗi xóa:", error);
    return NextResponse.json(
      { error: "Lỗi xóa sản phẩm", details: error instanceof Error ? error.message : "Lỗi không xác định" },
      { status: 500 }
    );
  }
}
