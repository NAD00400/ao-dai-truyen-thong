import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: Request, context: { params: { categorySlug?: string } }) {
  const { params } = context; 

  if (!params?.categorySlug) {
    return NextResponse.json({ message: "Thiếu categorySlug" }, { status: 400 });
  }
  const danhMucSlug = params.categorySlug;
  try {
    // Tìm danh mục dựa trên slug
    const danhmuc = await prisma.danh_muc.findFirst({
      where: { danh_muc_slug: danhMucSlug },
    });
    if (!danhmuc) {
      return NextResponse.json({ message: "Danh mục không tồn tại" }, { status: 404 });
    }
    // Lấy danh sách sản phẩm thuộc danh mục đó
    const products = await prisma.san_pham_dat_may.findMany({
      where: { ma_danh_muc: danhmuc.ma_danh_muc },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}