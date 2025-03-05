import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma'; // Đảm bảo bạn có file prisma.ts

export async function GET() {
  try {
    const products = await prisma.category.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
// API tạo Category
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string; // Lấy giá trị từ formData

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

// API xóa Category
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
    }

    const category = await prisma.category.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: 'Category deleted successfully', category }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
