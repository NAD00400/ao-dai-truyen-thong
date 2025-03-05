import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma"; // Dùng Prisma để tìm khách hàng theo userId

// lấy thông tin 1 khách hàng 
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;

    const customer = await prisma.khachHang.findUnique({
      where: { userId },
      include: {
        user: true,
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
// cập nhật thông tin một khách hàng 
export async function PUT(req: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;
    const { phone, address } = await req.json();

    const updatedCustomer = await prisma.khachHang.update({
      where: { userId },
      data: {
        phone,
        address,
      },
    });

    return NextResponse.json({ updatedCustomer });
  } catch (error) {
    console.error("Lỗi cập nhật khách hàng:", error);
    return NextResponse.json({ error: "Lỗi khi cập nhật khách hàng!" }, { status: 500 });
  }
}

  // xóa một khách hàng
  export async function DELETE(req: Request, { params }: { params: { userId: string } }) {
    try {
      const { userId } = params;
  
      await prisma.khachHang.delete({
        where: { userId },
      });
  
      return NextResponse.json({ message: "Khách hàng đã được xóa thành công" });
    } catch (error) {
      console.error("Lỗi xóa khách hàng:", error);
      return NextResponse.json({ error: "Lỗi khi xóa khách hàng!" }, { status: 500 });
    }
  }
  
    