import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma"; 

// tạo mới khách hàng
export async function POST(req: Request) {
  try {
    const { userId, phone, address } = await req.json();
    // Kiểm tra thông tin cần thiết
    if (!userId) {
      return NextResponse.json({ error: "userId là bắt buộc" }, { status: 400 });
    }

    const customer = await prisma.khachHang.create({
      data: {
        userId,
        phone,
        address,
      },
    });

    return NextResponse.json({ customer });
  } catch (error) {
    console.error("Lỗi tạo khách hàng:", error);
    return NextResponse.json({ error: "Lỗi khi tạo khách hàng!" }, { status: 500 });
  }
}
// lấy danh sách khách hàng 
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;

    const customer = await prisma.khachHang.findUnique({
      where: { userId },
      include: {
        soDo: true,
        gioHangs: true,
        lichHenDatMays: true,
        donHangs: true,
      },
    });

    if (!customer) {
      return NextResponse.json({ error: "Không tìm thấy khách hàng" }, { status: 404 });
    }

    return NextResponse.json({ customer });
  } catch (error) {
    console.error("Lỗi lấy thông tin khách hàng:", error);
    return NextResponse.json({ error: "Lỗi khi lấy thông tin khách hàng!" }, { status: 500 });
  }
}


  
  