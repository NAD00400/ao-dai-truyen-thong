import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const measurements = await prisma.customerMeasurement.findMany();
    return NextResponse.json(measurements, { status: 200 });
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Nếu gửi JSON, sử dụng req.json()
    const data = await req.json();

    const {
      customerId,
      chestSize,
      neckSize,
      bustSize,
      waistSize,
      hipSize,
      shoulderWidth,
      waistLength,
      armLength,
      armCircumference,
      pantLength,
      calfCircumference,
      headCircumference,
    } = data;

    if (!customerId) {
      return NextResponse.json({ error: 'Missing required field: customerId' }, { status: 400 });
    }

    const newMeasurement = await prisma.customerMeasurement.create({
      data: {
        customerId,
        chestSize: chestSize !== undefined ? Number(chestSize) : null,
        neckSize: neckSize !== undefined ? Number(neckSize) : null,
        bustSize: bustSize !== undefined ? Number(bustSize) : null,
        waistSize: waistSize !== undefined ? Number(waistSize) : null,
        hipSize: hipSize !== undefined ? Number(hipSize) : null,
        shoulderWidth: shoulderWidth !== undefined ? Number(shoulderWidth) : null,
        waistLength: waistLength !== undefined ? Number(waistLength) : null,
        armLength: armLength !== undefined ? Number(armLength) : null,
        armCircumference: armCircumference !== undefined ? Number(armCircumference) : null,
        pantLength: pantLength !== undefined ? Number(pantLength) : null,
        calfCircumference: calfCircumference !== undefined ? Number(calfCircumference) : null,
        headCircumference: headCircumference !== undefined ? Number(headCircumference) : null,
      },
    });

    return NextResponse.json(newMeasurement, { status: 201 });
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

