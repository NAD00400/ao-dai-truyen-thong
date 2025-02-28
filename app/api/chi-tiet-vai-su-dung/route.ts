import { NextResponse } from 'next/server';
import {prisma} from '../../lib/prisma';

// Lấy danh sách chi tiết vải sử dụng
export async function GET() {
  try {
    const chiTietVai = await prisma.chiTietVaiSuDung.findMany({
      include: {
        sanPham: true,
        vai: true,
      },
    });
    return NextResponse.json(chiTietVai);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi lấy danh sách chi tiết vải' }, { status: 500 });
  }
}

// Tạo mới chi tiết vải sử dụng
export async function POST(req: Request) {
  try {
    const { sanPhamId, vaiId, quantity } = await req.json();
    const newChiTietVai = await prisma.chiTietVaiSuDung.create({
      data: { sanPhamId, vaiId, quantity },
    });
    return NextResponse.json(newChiTietVai, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi tạo chi tiết vải' }, { status: 500 });
  }
}

