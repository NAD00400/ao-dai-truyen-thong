import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { madonhang: string } }) {
  try {
    const { madonhang } = await params; 
    if (!madonhang) {
      return NextResponse.json({ error: "Mã đơn hàng không hợp lệ" }, { status: 400 });
    }
    // Lấy thông tin đơn hàng + giao hàng
    const data_1 = await prisma.giao_hang.findFirst({
      where: { ma : madonhang },
    });
  
    // Lấy chi tiết đơn hàng
     // Lấy danh sách ID sản phẩm và số lượng từ chi tiết đơn hàng
     const chiTietDonHang = await prisma.chi_tiet_don_hang.findMany({
      where: { ma_don_hang: madonhang },
      select: { ma_san_pham: true, so_luong: true },
    });

    // Lọc bỏ `null` và ép kiểu `string[]`
    const productIds = chiTietDonHang.map(item => item.ma_san_pham).filter(Boolean) as string[];

    // Nếu không có sản phẩm nào, trả về mảng rỗng
    if (productIds.length === 0) {
      console.log({ products: [] });
      return;
    }

    // Lấy thông tin sản phẩm từ danh sách ID
    const productsData = await prisma.san_pham_dat_may.findMany({
      where: { ma_san_pham_dat_may: { in: productIds } },
      select: { ma_san_pham_dat_may: true, ten_san_pham: true },
    });

    // Ghép dữ liệu từ hai bảng
    const products = chiTietDonHang.map(item => {
      const product = productsData.find(p => p.ma_san_pham_dat_may === item.ma_san_pham);
      return {
        name: product?.ten_san_pham || "Không xác định",
        weight:  0.8, // Mặc định 0.8 nếu không có cân nặng
        quantity: item.so_luong || 1, // Mặc định số lượng là 1 nếu không có dữ liệu
        product_code: product?.ma_san_pham_dat_may || "UNKNOWN",
      };
    });
    
    const responseData = {
      order: data_1,
      products, 
    };

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error("Lỗi API:", error);
    return NextResponse.json({ error: "Lỗi khi lấy danh sách chi tiết đơn hàng" }, { status: 500 });
  }
}
