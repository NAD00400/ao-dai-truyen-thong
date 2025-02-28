import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Tạo User (Admin, Customer)
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'anhduynguyenkhuat@gmail.com',
        firebaseId: faker.string.uuid(),
        fullName: 'Admin User',
        role: 'ADMIN',
      },
      {
        email: 'customer@example.com',
        firebaseId: faker.string.uuid(),
        fullName: 'Customer User',
        role: 'CUSTOMER',
      },
    ],
  });

  // Lấy danh sách User (để gán vào KhachHang)
  const userList = await prisma.user.findMany({ where: { role: 'CUSTOMER' } });

  // Tạo KhachHang
  const customers = await Promise.all(
    userList.map((user) =>
      prisma.khachHang.create({
        data: {
          userId: user.id,
          phone: faker.phone.number(),
          address: faker.location.streetAddress(),
        },
      })
    )
  );

  // Tạo Đơn Hàng (DonHang)
  const orders = await Promise.all(
    customers.map((customer) =>
      prisma.donHang.create({
        data: {
          khachHangId: customer.id,
          orderDate: new Date(),
          status: faker.helpers.arrayElement(['PENDING', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED']),
          totalAmount: faker.number.float({ min: 50, max: 500 }),
          // Thêm các trường bắt buộc còn thiếu
          diaChiGiaoHang: faker.location.streetAddress(),
          phuongThucThanhToan: faker.helpers.arrayElement(['CASH', 'CARD', 'ONLINE']),
          thanhToanThanhCong: faker.datatype.boolean(),
        },
      })
    )
  );

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
