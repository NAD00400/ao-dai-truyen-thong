import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const customers = await prisma.customer.findMany();
    return NextResponse.json(customers, { status: 200 });
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Lấy dữ liệu từ form-data
    const formData = await req.formData();

    // Lấy trường bắt buộc: userId (model Customer yêu cầu userId là unique)
    const userId = formData.get("userId")?.toString() || "";
    if (!userId) {
      return NextResponse.json({ error: "Missing required field: userId" }, { status: 400 });
    }

    // Lấy các trường tùy chọn
    const phone = formData.get("phone")?.toString() || null;
    const address = formData.get("address")?.toString() || null;

    // Tạo khách hàng mới
    const newCustomer = await prisma.customer.create({
      data: {
        userId,
        phone,
        address,
      },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
