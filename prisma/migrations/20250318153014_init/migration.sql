-- CreateEnum
CREATE TYPE "VaiTro" AS ENUM ('KHACH_HANG', 'QUAN_TRI');

-- CreateEnum
CREATE TYPE "TrangThaiLichHen" AS ENUM ('CHO_XAC_NHAN', 'DA_XAC_NHAN', 'DA_HUY');

-- CreateEnum
CREATE TYPE "TrangThaiDonHang" AS ENUM ('CHO_XU_LY', 'DA_THANH_TOAN', 'DANG_GIAO', 'HOAN_THANH', 'DA_HUY');

-- CreateEnum
CREATE TYPE "PhuongThucThanhToan" AS ENUM ('ZALOPAY', 'THANH_TOAN_KHI_NHAN_HANG', 'CHUYEN_KHOAN');

-- CreateEnum
CREATE TYPE "TrangThaiThanhToan" AS ENUM ('CHO_THANH_TOAN', 'DA_THANH_TOAN', 'THAT_BAI');

-- CreateEnum
CREATE TYPE "LoaiThanhToan" AS ENUM ('THANH_TOAN_HET', 'DAT_COC');

-- CreateEnum
CREATE TYPE "TrangThaiGiaoHang" AS ENUM ('CHO_XU_LY', 'DANG_VAN_CHUYEN', 'DA_GIAO', 'THAT_BAI');

-- CreateTable
CREATE TABLE "chi_tiet_don_hang" (
    "so_luong" INTEGER NOT NULL,
    "gia_tien" DOUBLE PRECISION NOT NULL,
    "ma_don_hang" UUID,
    "ma_chi_tiet_don_hang" UUID NOT NULL,
    "ma_san_pham" UUID,
    "ma_so_do" UUID,

    CONSTRAINT "chi_tiet_don_hang_pkey" PRIMARY KEY ("ma_chi_tiet_don_hang")
);

-- CreateTable
CREATE TABLE "chi_tiet_gio_hang" (
    "ma_san_pham_dat_may" TEXT NOT NULL,
    "so_luong" INTEGER NOT NULL,
    "ma_chi_tiet_don_hang" UUID NOT NULL,
    "ma_gio_hang" UUID,

    CONSTRAINT "chi_tiet_gio_hang_pkey" PRIMARY KEY ("ma_chi_tiet_don_hang")
);

-- CreateTable
CREATE TABLE "danh_muc" (
    "ma_danh_muc" UUID NOT NULL,
    "danh_muc_slug" TEXT NOT NULL,
    "url_image" TEXT NOT NULL,
    "ten_danh_muc" TEXT NOT NULL,

    CONSTRAINT "danh_muc_pkey" PRIMARY KEY ("ma_danh_muc")
);

-- CreateTable
CREATE TABLE "don_hang" (
    "ngay_dat_hang" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trang_thai_don_hang" TEXT NOT NULL,
    "tong_tien_don_hang" DOUBLE PRECISION NOT NULL,
    "ngay_tao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ghi_chu" TEXT,
    "phuong_thuc_thanh_toan" TEXT NOT NULL,
    "thanh_toan_thanh_cong" BOOLEAN NOT NULL,
    "ngay_cap_nhat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ma_khach_hang" UUID,
    "ma_don_hang" UUID NOT NULL,

    CONSTRAINT "don_hang_pkey" PRIMARY KEY ("ma_don_hang")
);

-- CreateTable
CREATE TABLE "giao_hang" (
    "trang_thai" TEXT NOT NULL,
    "phi_van_chuyen" TEXT,
    "dia_chi_lay_hang" TEXT NOT NULL,
    "dia_chi_giao_hang" TEXT NOT NULL,
    "ghi_chu" TEXT,
    "ngay_giao_du_kien" TIMESTAMP(3),
    "ngay_giao_thuc_te" TIMESTAMP(3),
    "ma_hoa_don" UUID NOT NULL,
    "ma_van_don" TEXT,
    "ly_do_huy" TEXT,
    "ngay_tao" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "ngay_cap_nhat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "ma_giao_hang" SERIAL NOT NULL,
    "quan_nhan_hang" TEXT,
    "tinh_nhan_hang" TEXT,
    "phuong_nhan_hang" TEXT,
    "sdt_nhan_hang" TEXT,
    "tinh_giao_hang" TEXT,
    "phuong_giao_hang" TEXT,
    "quan_giao_hang" TEXT,
    "sdt_giao_hang" TEXT,

    CONSTRAINT "giao_hang_pkey" PRIMARY KEY ("ma_giao_hang")
);

-- CreateTable
CREATE TABLE "gio_hang" (
    "ma_gio_hang" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ma_khach_hang" UUID,

    CONSTRAINT "ShoppingCart_pkey" PRIMARY KEY ("ma_gio_hang")
);

-- CreateTable
CREATE TABLE "hoa_don" (
    "invoice_number" TEXT,
    "tien_can_thanh_toan" DECIMAL,
    "tien_da_thanh_toan" DECIMAL,
    "thue" DECIMAL,
    "ngay_phat_hanh" DATE,
    "ngay_het_han_thanh_toan" DATE,
    "ngay_cap_nhat" DATE,
    "trang_thanh_toan" TEXT,
    "ma_hoa_don" UUID NOT NULL,
    "ma_don_hang" UUID,

    CONSTRAINT "hoa_don_pkey" PRIMARY KEY ("ma_hoa_don")
);

-- CreateTable
CREATE TABLE "khach_hang" (
    "ma_khach_hang" UUID NOT NULL,
    "ma_nguoi_dung" TEXT,
    "so_dien_thoai" TEXT,
    "dia_chi_khach_hang" TEXT,

    CONSTRAINT "khach_pkey" PRIMARY KEY ("ma_khach_hang")
);

-- CreateTable
CREATE TABLE "khuyen_mai" (
    "ma_khuyen_mai" SERIAL NOT NULL,
    "phan_tram_giam_gia" TEXT,
    "ngay_ap_dung" DATE,
    "ngay_het_han" DATE,

    CONSTRAINT "khuyen_mai_pkey" PRIMARY KEY ("ma_khuyen_mai")
);

-- CreateTable
CREATE TABLE "lich_hen_khach_hang" (
    "ma_lich_hen" UUID NOT NULL,
    "ma_khach_hang" UUID,
    "ngay_hen" TIMESTAMP(6),
    "ngay_tao" TIMESTAMP(6),
    "trang" TEXT,

    CONSTRAINT "lic_pkey" PRIMARY KEY ("ma_lich_hen")
);

-- CreateTable
CREATE TABLE "nguoi_dung" (
    "ma_nguoi_dung" TEXT NOT NULL,
    "email_nguoi_dung" TEXT NOT NULL,
    "ten_nguoi_dung" TEXT,
    "vai_tro" "VaiTro" NOT NULL DEFAULT 'KHACH_HANG',
    "ngay_tao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ngay_cap_nhat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "link_anh_dai_dien" TEXT,
    "firebaseId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ma_nguoi_dung")
);

-- CreateTable
CREATE TABLE "phu_lieu_may_mac" (
    "vai_chinh" TEXT NOT NULL,
    "chi" TEXT,
    "nut" TEXT,
    "ngay_tao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ma_phu_lieu" UUID NOT NULL,
    "day_keo" TEXT,
    "ngay_cap_nhat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Ren" TEXT,
    "vai_lot" TEXT,
    "hat_cuom" TEXT,
    "mech_dung" TEXT,

    CONSTRAINT "component_pkey" PRIMARY KEY ("ma_phu_lieu")
);

-- CreateTable
CREATE TABLE "san_pham_dat_may" (
    "ten_san_pham" TEXT NOT NULL,
    "ma_san_pham_dat_may" UUID NOT NULL,
    "mo_ta_san_pham" TEXT,
    "gia_tien" DOUBLE PRECISION NOT NULL,
    "url_Image" TEXT NOT NULL,
    "ngay_tao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ngay_cap_nhat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "co_san" BOOLEAN NOT NULL DEFAULT false,
    "ma_danh_muc" UUID,
    "ma_phu_lieu" UUID,

    CONSTRAINT "san_pham_pkey" PRIMARY KEY ("ma_san_pham_dat_may")
);

-- CreateTable
CREATE TABLE "so_do_dat_may" (
    "vong_nguc" DOUBLE PRECISION,
    "vong_co" DOUBLE PRECISION,
    "vong_eo" DOUBLE PRECISION,
    "be_ngang_vai" DOUBLE PRECISION,
    "vong_hong" DOUBLE PRECISION,
    "chieu_dai_ao" DOUBLE PRECISION,
    "chieu_dai_tu_vai_toi_eo" DOUBLE PRECISION,
    "chieu_dai_tay_ao" DOUBLE PRECISION,
    "vong_bap_tay" DOUBLE PRECISION,
    "vong_khuy_tay" DOUBLE PRECISION,
    "vong_co_tay" DOUBLE PRECISION,
    "chieu_dai_quan" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vong_dui" DOUBLE PRECISION,
    "vong_dau_goi" TEXT,
    "vong_ong_quan" TEXT,
    "ma_so_do" UUID NOT NULL,
    "ma_khach_hang" UUID,

    CONSTRAINT "so_do_dat_may_pkey" PRIMARY KEY ("ma_so_do")
);

-- CreateTable
CREATE TABLE "thanh_toan" (
    "id" TEXT NOT NULL,
    "paymentMethod" "LoaiThanhToan" NOT NULL,
    "paymentStatus" "TrangThaiThanhToan" NOT NULL,
    "transactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentType" "PhuongThucThanhToan" NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "index_1" ON "khach_hang" USING HASH ("ma_nguoi_dung");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "nguoi_dung"("email_nguoi_dung");

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseId_key" ON "nguoi_dung"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "thanh_toan"("transactionId");

-- AddForeignKey
ALTER TABLE "chi_tiet_don_hang" ADD CONSTRAINT "constraint_1" FOREIGN KEY ("ma_so_do") REFERENCES "so_do_dat_may"("ma_so_do") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "don_hang" ADD CONSTRAINT "fk_tb_khach_hang" FOREIGN KEY ("ma_khach_hang") REFERENCES "khach_hang"("ma_khach_hang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "giao_hang" ADD CONSTRAINT "fk_tb_don_hang" FOREIGN KEY ("ma_hoa_don") REFERENCES "don_hang"("ma_don_hang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gio_hang" ADD CONSTRAINT "fk_tb_khach_hang" FOREIGN KEY ("ma_khach_hang") REFERENCES "khach_hang"("ma_khach_hang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "khach_hang" ADD CONSTRAINT "fk_tb_nguoi_dung" FOREIGN KEY ("ma_nguoi_dung") REFERENCES "nguoi_dung"("ma_nguoi_dung") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "san_pham_dat_may" ADD CONSTRAINT "constraint_1" FOREIGN KEY ("ma_danh_muc") REFERENCES "danh_muc"("ma_danh_muc") ON DELETE NO ACTION ON UPDATE NO ACTION;
