import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

// Tạo voucher mới
export async function POST(req: Request) {
  try {
    const { code, discount } = await req.json();

    // Kiểm tra nếu voucher đã tồn tại
    const existingVoucher = await prisma.voucher.findUnique({
      where: { code },
    });

    if (existingVoucher) {
      return NextResponse.json({ error: "Voucher đã tồn tại!" }, { status: 400 });
    }

    const newVoucher = await prisma.voucher.create({
      data: {
        code,
        discount,
      },
    });

    return NextResponse.json(newVoucher);
  } catch (error) {
    console.error("Lỗi khi tạo voucher:", error);
    return NextResponse.json({ error: "Lỗi khi tạo voucher" }, { status: 500 });
  }
}

  // lấy tất cả 
  export async function GET(req: Request) {
    try {
      const vouchers = await prisma.voucher.findMany();
  
      return NextResponse.json(vouchers);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách voucher:", error);
      return NextResponse.json({ error: "Lỗi khi lấy danh sách voucher" }, { status: 500 });
    }
  }
  