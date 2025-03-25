import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { put } from '@vercel/blob';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.san_pham_dat_may.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     // Lấy dữ liệu từ form-data
//     const formData = await req.formData();

//     // Các trường bắt buộc
//     const name = formData.get("name")?.toString() || "";
//     const priceStr = formData.get("price")?.toString() || "0";
//     const price = Number(priceStr);
//     const categoryId = formData.get("categoryId")?.toString() || "";
//     const isAvailable = formData.get("isAvailable") === "true";

//     if (!name || price <= 0 || !categoryId) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     // Các trường tùy chọn
//     const description = formData.get("description")?.toString() || "";
//     const detailedDescription = formData.get("detailedDescription")?.toString() || "";
//     const size = formData.get("size")?.toString() || "";
//     const color = formData.get("color")?.toString() || "";
//     const customAttributesStr = formData.get("customAttributes")?.toString() || "";
//     let customAttributes: object = {};
//     try {
//       customAttributes = customAttributesStr ? JSON.parse(customAttributesStr) : {};
//     } catch (err) {
//       customAttributes = {};
//     }
//     const productionTime = formData.get("productionTime")?.toString() || "";
//     const careInstructions = formData.get("careInstructions")?.toString() || "";
//     const ratingStr = formData.get("rating")?.toString() || "";
//     const rating = ratingStr ? Number(ratingStr) : null;
//     const reviewCountStr = formData.get("reviewCount")?.toString() || "";
//     const reviewCount = reviewCountStr ? Number(reviewCountStr) : null;

//     // Xử lý upload ảnh (nếu có)
//     let imageUrl = "";
//     const image = formData.get("image") as File | null;
//     if (image) {
//       const arrayBuffer = await image.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);
//       console.log("Uploading image...");
//       const blob = await put(`products/${Date.now()}-${image.name}`, buffer, { access: "public" });
//       imageUrl = blob.url;
//       console.log("Image uploaded:", imageUrl);
//     }

//     // Tạo sản phẩm mới với tất cả các trường
//     const newProduct = await prisma.san_pham_dat_may.create({
//       data: {
//         name,
//         description,
//         detailedDescription,
//         price,
//         imageUrl,
//         size,
//         color,
//         customAttributes,
//         isAvailable,
//         productionTime,
//         careInstructions,
//         categoryId,
//         rating,
//         reviewCount,
//       },
//     });

//     return NextResponse.json(newProduct, { status: 201 });
//   } catch (error: any) {
//     console.error("Server error:", error);
//     return NextResponse.json(
//       { error: "Server error", details: error instanceof Error ? error.message : "Unknown error" },
//       { status: 500 }
//     );
//   }
// }
