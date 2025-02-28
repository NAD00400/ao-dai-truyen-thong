/*
  Warnings:

  - The values [DESIGNER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `items` on the `GioHang` table. All the data in the column will be lost.
  - Added the required column `diaChiGiaoHang` to the `DonHang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phuongThucThanhToan` to the `DonHang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thanhToanThanhCong` to the `DonHang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentType` to the `ThanhToan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('FULL_PAYMENT', 'DEPOSIT');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('CUSTOMER', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';
COMMIT;

-- AlterTable
ALTER TABLE "DonHang" ADD COLUMN     "diaChiGiaoHang" TEXT NOT NULL,
ADD COLUMN     "ghiChu" TEXT,
ADD COLUMN     "phiGiaoHang" DOUBLE PRECISION,
ADD COLUMN     "phuongThucThanhToan" TEXT NOT NULL,
ADD COLUMN     "soDoKhachHangId" TEXT,
ADD COLUMN     "thanhToanThanhCong" BOOLEAN NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "vouchers" TEXT;

-- AlterTable
ALTER TABLE "GiaoHang" ADD COLUMN     "estimatedDeliveryDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "GioHang" DROP COLUMN "items";

-- AlterTable
ALTER TABLE "ThanhToan" ADD COLUMN     "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paymentType" "PaymentType" NOT NULL;

-- CreateTable
CREATE TABLE "GioHangItem" (
    "id" TEXT NOT NULL,
    "gioHangId" TEXT NOT NULL,
    "sanPhamId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "GioHangItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voucher" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_code_key" ON "Voucher"("code");

-- AddForeignKey
ALTER TABLE "GioHangItem" ADD CONSTRAINT "GioHangItem_gioHangId_fkey" FOREIGN KEY ("gioHangId") REFERENCES "GioHang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GioHangItem" ADD CONSTRAINT "GioHangItem_sanPhamId_fkey" FOREIGN KEY ("sanPhamId") REFERENCES "SanPhamDatMay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonHang" ADD CONSTRAINT "DonHang_vouchers_fkey" FOREIGN KEY ("vouchers") REFERENCES "Voucher"("code") ON DELETE SET NULL ON UPDATE CASCADE;
