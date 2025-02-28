-- CreateTable
CREATE TABLE "PhieuGiaoHang" (
    "id" TEXT NOT NULL,
    "donHangId" TEXT NOT NULL,
    "shippingStatus" "ShippingStatus" NOT NULL,
    "trackingCode" TEXT,
    "estimatedDate" TIMESTAMP(3),
    "deliveryDate" TIMESTAMP(3),
    "isReturned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PhieuGiaoHang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PhieuGiaoHang_donHangId_key" ON "PhieuGiaoHang"("donHangId");

-- AddForeignKey
ALTER TABLE "PhieuGiaoHang" ADD CONSTRAINT "PhieuGiaoHang_donHangId_fkey" FOREIGN KEY ("donHangId") REFERENCES "DonHang"("id") ON DELETE CASCADE ON UPDATE CASCADE;
