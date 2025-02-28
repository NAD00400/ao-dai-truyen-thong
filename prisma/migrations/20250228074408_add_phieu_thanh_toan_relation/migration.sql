-- CreateTable
CREATE TABLE "PhieuThanhToan" (
    "id" TEXT NOT NULL,
    "donHangId" TEXT NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "paymentType" "PaymentType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "isRefunded" BOOLEAN NOT NULL DEFAULT false,
    "refundAmount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PhieuThanhToan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PhieuThanhToan_donHangId_key" ON "PhieuThanhToan"("donHangId");

-- AddForeignKey
ALTER TABLE "PhieuThanhToan" ADD CONSTRAINT "PhieuThanhToan_donHangId_fkey" FOREIGN KEY ("donHangId") REFERENCES "DonHang"("id") ON DELETE CASCADE ON UPDATE CASCADE;
