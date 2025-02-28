-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'ADMIN', 'DESIGNER');

-- CreateEnum
CREATE TYPE "LichHenStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "DonHangStatus" AS ENUM ('PENDING', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('ZALOPAY', 'COD', 'BANK_TRANSFER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "ShippingStatus" AS ENUM ('PENDING', 'IN_TRANSIT', 'DELIVERED', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KhachHang" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KhachHang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoDoKhachHang" (
    "id" TEXT NOT NULL,
    "khachHangId" TEXT NOT NULL,
    "chieuDaiAo" DOUBLE PRECISION,
    "vongCo" DOUBLE PRECISION,
    "vongNguc" DOUBLE PRECISION,
    "vongEo" DOUBLE PRECISION,
    "vongHong" DOUBLE PRECISION,
    "beNgangVai" DOUBLE PRECISION,
    "chieuDaiVaiEo" DOUBLE PRECISION,
    "daiTay" DOUBLE PRECISION,
    "vongBapTay" DOUBLE PRECISION,
    "chieuDaiQuan" DOUBLE PRECISION,
    "vongDui" DOUBLE PRECISION,
    "vongDauGoi" DOUBLE PRECISION,
    "vongOngQuan" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SoDoKhachHang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GioHang" (
    "id" TEXT NOT NULL,
    "khachHangId" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GioHang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LichHenDatMay" (
    "id" TEXT NOT NULL,
    "khachHangId" TEXT NOT NULL,
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "status" "LichHenStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LichHenDatMay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SanPhamDatMay" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SanPhamDatMay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonHang" (
    "id" TEXT NOT NULL,
    "khachHangId" TEXT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "DonHangStatus" NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DonHang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChiTietDonHang" (
    "id" TEXT NOT NULL,
    "donHangId" TEXT NOT NULL,
    "sanPhamId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChiTietDonHang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MauThietKe" (
    "id" TEXT NOT NULL,
    "createdBy" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MauThietKe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChiTietVaiSuDung" (
    "id" TEXT NOT NULL,
    "sanPhamId" TEXT NOT NULL,
    "vaiId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChiTietVaiSuDung_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vai" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "pricePerMeter" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kho" (
    "id" TEXT NOT NULL,
    "vaiId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThanhToan" (
    "id" TEXT NOT NULL,
    "donHangId" TEXT NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "transactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ThanhToan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GiaoHang" (
    "id" TEXT NOT NULL,
    "donHangId" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "shippingMethod" TEXT,
    "trackingNumber" TEXT,
    "shippingStatus" "ShippingStatus" NOT NULL,
    "shippingFee" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GiaoHang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "KhachHang_userId_key" ON "KhachHang"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SoDoKhachHang_khachHangId_key" ON "SoDoKhachHang"("khachHangId");

-- CreateIndex
CREATE UNIQUE INDEX "ThanhToan_donHangId_key" ON "ThanhToan"("donHangId");

-- CreateIndex
CREATE UNIQUE INDEX "ThanhToan_transactionId_key" ON "ThanhToan"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "GiaoHang_donHangId_key" ON "GiaoHang"("donHangId");

-- AddForeignKey
ALTER TABLE "KhachHang" ADD CONSTRAINT "KhachHang_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoDoKhachHang" ADD CONSTRAINT "SoDoKhachHang_khachHangId_fkey" FOREIGN KEY ("khachHangId") REFERENCES "KhachHang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GioHang" ADD CONSTRAINT "GioHang_khachHangId_fkey" FOREIGN KEY ("khachHangId") REFERENCES "KhachHang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LichHenDatMay" ADD CONSTRAINT "LichHenDatMay_khachHangId_fkey" FOREIGN KEY ("khachHangId") REFERENCES "KhachHang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonHang" ADD CONSTRAINT "DonHang_khachHangId_fkey" FOREIGN KEY ("khachHangId") REFERENCES "KhachHang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiTietDonHang" ADD CONSTRAINT "ChiTietDonHang_donHangId_fkey" FOREIGN KEY ("donHangId") REFERENCES "DonHang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiTietDonHang" ADD CONSTRAINT "ChiTietDonHang_sanPhamId_fkey" FOREIGN KEY ("sanPhamId") REFERENCES "SanPhamDatMay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MauThietKe" ADD CONSTRAINT "MauThietKe_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiTietVaiSuDung" ADD CONSTRAINT "ChiTietVaiSuDung_sanPhamId_fkey" FOREIGN KEY ("sanPhamId") REFERENCES "SanPhamDatMay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChiTietVaiSuDung" ADD CONSTRAINT "ChiTietVaiSuDung_vaiId_fkey" FOREIGN KEY ("vaiId") REFERENCES "Vai"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kho" ADD CONSTRAINT "Kho_vaiId_fkey" FOREIGN KEY ("vaiId") REFERENCES "Vai"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThanhToan" ADD CONSTRAINT "ThanhToan_donHangId_fkey" FOREIGN KEY ("donHangId") REFERENCES "DonHang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiaoHang" ADD CONSTRAINT "GiaoHang_donHangId_fkey" FOREIGN KEY ("donHangId") REFERENCES "DonHang"("id") ON DELETE CASCADE ON UPDATE CASCADE;
