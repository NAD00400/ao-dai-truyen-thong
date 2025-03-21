import { NextResponse } from 'next/server';
import { prisma } from "../../../lib/prisma";
import { v4 } from 'uuid';
import { put } from '@vercel/blob';

// Hàm tạo slug từ tên danh mục
const createSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

// API tạo danh mục (upload ảnh lên Vercel Blob)
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const imageFile = formData.get('image') as File | null;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    let imageUrl = '';

    // ✅ Nếu có file ảnh -> Upload lên Vercel Blob
    if (imageFile) {
      const blob = await put(`danh_muc/${v4()}_${imageFile.name}`, imageFile, {
        access: 'public',
      });
      imageUrl = blob.url; // Lấy URL ảnh từ Vercel Blob
    }

    // ✅ Tạo ma_danh_muc nếu không có trong request
    const maDanhMuc = v4(); // Tạo mã ngẫu nhiên cho danh mục

    // ✅ Lưu danh mục vào database
    const category = await prisma.danh_muc.create({
      data: {
        ma_danh_muc: maDanhMuc, // Mã danh mục sử dụng uuid
        ten_danh_muc: name, // Tên danh mục
        danh_muc_slug: createSlug(name), // Tạo slug từ tên danh mục
        url_image: imageUrl, // Lưu URL ảnh vào database
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
