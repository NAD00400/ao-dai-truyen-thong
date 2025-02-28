import { NextResponse } from 'next/server';
import {prisma} from '../../../lib/prisma';
// Lấy thông tin, cập nhật, xóa theo ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      const { quantity } = await req.json();
      const updatedChiTietVai = await prisma.chiTietVaiSuDung.update({
        where: { id: params.id },
        data: { quantity },
      });
      return NextResponse.json(updatedChiTietVai);
    } catch (error) {
      return NextResponse.json({ error: 'Lỗi khi cập nhật chi tiết vải' }, { status: 500 });
    }
  }
  
  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      await prisma.chiTietVaiSuDung.delete({ where: { id: params.id } });
      return NextResponse.json({ message: 'Xóa thành công' });
    } catch (error) {
      return NextResponse.json({ error: 'Lỗi khi xóa chi tiết vải' }, { status: 500 });
    }
  }
  