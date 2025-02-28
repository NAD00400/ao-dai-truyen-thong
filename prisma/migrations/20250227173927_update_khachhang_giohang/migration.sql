/*
  Warnings:

  - A unique constraint covering the columns `[khachHangId]` on the table `GioHang` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GioHang_khachHangId_key" ON "GioHang"("khachHangId");
