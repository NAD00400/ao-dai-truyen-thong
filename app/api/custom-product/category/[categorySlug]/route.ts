import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(
  req: Request,
  context: { params: { categorySlug?: string } } // ✅ Dùng `context` thay vì destructuring `{ params }`
) {
  const { params } = context; // ✅ Giữ `params` nguyên vẹn để tránh lỗi `await`
  
  if (!params?.categorySlug) {
    return NextResponse.json({ message: "Thiếu categorySlug" }, { status: 400 });
  }

  const categorySlug = params.categorySlug;

  try {
    // Tìm danh mục dựa trên slug
    const category = await prisma.category.findUnique({
      where: { categorySlug },
    });

    if (!category) {
      return NextResponse.json({ message: "Danh mục không tồn tại" }, { status: 404 });
    }

    // Lấy danh sách sản phẩm thuộc danh mục đó
    const products = await prisma.customProduct.findMany({
      where: { categoryId: category.id },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
