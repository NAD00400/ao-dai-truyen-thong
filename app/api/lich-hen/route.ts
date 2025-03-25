import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, AppointmentStatus } from "@prisma/client";

const prisma = new PrismaClient();

// Lấy danh sách lịch hẹn hoặc lịch hẹn theo ID
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    console.log("test",req.body);
    if (id) {
      const appointment = await prisma.appointment.findUnique({
        where: { id },
        include: { customer: true }, // Lấy thêm thông tin khách hàng nếu có
      });

      return appointment
        ? NextResponse.json(appointment)
        : NextResponse.json({ error: "Không tìm thấy lịch hẹn" }, { status: 404 });
    }

    const appointments = await prisma.appointment.findMany({
      include: { customer: true }, // Lấy thêm thông tin khách hàng
    });

    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}

// Đặt lịch hẹn mới


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerId, appointmentDate, notes, status, sdt, guestName } = body;

    if (!appointmentDate || !status) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        customerId,
        appointmentDate: new Date(appointmentDate),
        notes,
        status,
        sdt,
        guestName_: guestName || undefined, // ✅ Sử dụng giá trị mặc định trong Prisma nếu không có guestName
      },
    });

    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    console.error("Lỗi tạo lịch hẹn:", error);
    return NextResponse.json({ error: "Lỗi khi tạo lịch hẹn" }, { status: 500 });
  }
}



// Cập nhật lịch hẹn theo ID
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Thiếu ID lịch hẹn" }, { status: 400 });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    return NextResponse.json({ error: "Không thể cập nhật lịch hẹn" }, { status: 500 });
  }
}

// Xóa lịch hẹn theo ID
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Thiếu ID lịch hẹn" }, { status: 400 });
    }

    await prisma.appointment.delete({ where: { id } });

    return NextResponse.json({ message: "Xóa lịch hẹn thành công" });
  } catch (error) {
    return NextResponse.json({ error: "Không thể xóa lịch hẹn" }, { status: 500 });
  }
}
