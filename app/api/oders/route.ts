import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const orders = await prisma.order.findMany();
    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    console.error("Error retrieving orders:", error);
    return NextResponse.json(
      { error: "Error retrieving orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerId,
      status,
      totalAmount,
      shippingAddress,
      notes,
      shippingFee,
      paymentMethod,
      measurementId,
      paymentCompleted,
      voucherCode,
      orderDate
    } = body;

    if (
      !customerId ||
      !status ||
      totalAmount === undefined ||
      !shippingAddress ||
      !paymentMethod ||
      paymentCompleted === undefined
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newOrder = await prisma.order.create({
      data: {
        customerId,
        status,
        totalAmount: Number(totalAmount),
        shippingAddress,
        notes: notes || null,
        shippingFee: shippingFee !== undefined ? Number(shippingFee) : null,
        paymentMethod,
        measurementId: measurementId || null,
        paymentCompleted: Boolean(paymentCompleted),
        voucherCode: voucherCode || null,
        orderDate: orderDate ? new Date(orderDate) : undefined,
      },
    });
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    const err = error as Error;
    console.error("Error creating order:", err);
    return NextResponse.json({ error: "Error creating order" }, { status: 500 });
  }
}
