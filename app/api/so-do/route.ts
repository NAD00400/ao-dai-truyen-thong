// app/api/so-do/route.ts

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
  
//lấy số đo của khách hàng 
export async function GET(req: Request, { params }: { params: { khachHangId: string } }) {
    try {
      const { khachHangId } = params;
      
      const soDo = await prisma.soDoKhachHang.findUnique({
        where: { khachHangId },
      });
  
      if (!soDo) {
        return NextResponse.json({ error: "Không tìm thấy số đo cho khách hàng này" }, { status: 404 });
      }
  
      return NextResponse.json(soDo);
    } catch (error) {
      console.error("Lỗi khi lấy số đo:", error);
      return NextResponse.json({ error: "Lỗi khi lấy số đo" }, { status: 500 });
    }
  }
  
  
// cập nhật số đo cho khách hàng

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      const data = await req.json();
      const { id } = params;
  
      const updatedSoDo = await prisma.soDoKhachHang.update({
        where: { id },
        data: {
          ...data, // Thông tin cập nhật từ request body
        },
      });
  
      return NextResponse.json(updatedSoDo);
    } catch (error) {
      console.error("Lỗi khi cập nhật số đo:", error);
      return NextResponse.json({ error: "Lỗi khi cập nhật số đo" }, { status: 500 });
    }
  }
  
  
// xoa so do của khách hàng 
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
  
      const deletedSoDo = await prisma.soDoKhachHang.delete({
        where: { id },
      });
  
      return NextResponse.json(deletedSoDo);
    } catch (error) {
      console.error("Lỗi khi xóa số đo:", error);
      return NextResponse.json({ error: "Lỗi khi xóa số đo" }, { status: 500 });
    }
  }
  