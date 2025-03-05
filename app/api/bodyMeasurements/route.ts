import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

// tạo số do cho khách hàng
export async function POST(req: Request) {
    try {
      const data = await req.json();
  
      const { khachHangId, chieuDaiAo, vongCo, vongNguc, vongEo, vongHong, beNgangVai, chieuDaiVaiEo, daiTay, vongBapTay, chieuDaiQuan, vongDui, vongDauGoi, vongOngQuan } = data;
  
      const newSoDo = await prisma.soDoKhachHang.create({
        data: {
          khachHangId,
          chieuDaiAo,
          vongCo,
          vongNguc,
          vongEo,
          vongHong,
          beNgangVai,
          chieuDaiVaiEo,
          daiTay,
          vongBapTay,
          chieuDaiQuan,
          vongDui,
          vongDauGoi,
          vongOngQuan,
        },
      });
  
      return NextResponse.json(newSoDo);
    } catch (error) {
      console.error("Lỗi khi tạo số đo:", error);
      return NextResponse.json({ error: "Lỗi khi tạo số đo" }, { status: 500 });
    }
  }
  

  