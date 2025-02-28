import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
    // sửa
    export async function PUT(req: Request, { params }: { params: { id: string } }) {
        try {
          const { id } = params;
          const { code, discount } = await req.json();
      
          const updatedVoucher = await prisma.voucher.update({
            where: { id },
            data: {
              code,
              discount,
            },
          });
      
          return NextResponse.json(updatedVoucher);
        } catch (error) {
          console.error("Lỗi khi cập nhật voucher:", error);
          return NextResponse.json({ error: "Lỗi khi cập nhật voucher" }, { status: 500 });
        }
      }
      // xóa
      export async function DELETE(req: Request, { params }: { params: { id: string } }) {
        try {
          const { id } = params;
      
          const deletedVoucher = await prisma.voucher.delete({
            where: { id },
          });
      
          return NextResponse.json(deletedVoucher);
        } catch (error) {
          console.error("Lỗi khi xóa voucher:", error);
          return NextResponse.json({ error: "Lỗi khi xóa voucher" }, { status: 500 });
        }
      }