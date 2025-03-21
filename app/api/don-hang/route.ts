import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Import Prisma từ file singleton

export async function GET(req: NextRequest) {
    const orders = await prisma.don_hang.findMany();
    if (!orders) {
      return NextResponse.json({ message: "No orders found" }, { status: 404 });
    }
    return NextResponse.json(orders, { status: 200 });
}
