'use client'
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
const defaultWeight = 0.88;
type Order = {
  ngay_dat_hang: string;
  tong_tien_don_hang: number;
  ngay_tao: string;
  ghi_chu?: string;
  thanh_toan_thanh_cong: boolean;
  ngay_cap_nhat: string;
  ma_khach_hang?: string;
  ma_don_hang: string;
  trang_thai_don_hang?: string;
};
// Kiểu cho sản phẩm trong đơn hàng
interface ISanPham_GH{
  name: string;
  weight: number;
  quantity: number;
  product_code: number;
}

// Kiểu cho thông tin đơn hàng
interface IGiaoHang {
  id: string;
  pick_name: string;
  pick_address: string;
  pick_province: string;
  pick_district: string;
  pick_ward: string;       // Thêm trường pick_ward vì mẫu có trường này
  pick_tel: string;
  tel: string;
  name: string;
  address: string;
  province: string;        // Sửa lại "provinde" thành "province"
  district: string;
  ward: string;
  street:string;
  hamlet: string;

  pick_date: string;       // Có thể dùng kiểu string hoặc Date, tùy vào cách bạn xử lý
  pick_money: number;
  note: string;
  value: number;
  transport: string;
  pick_option: string;
  deliver_option: string;

  
  // Các trường trả hàng (optional nếu không phải luôn có)
  return_name?: string;
  return_address?: string;
  return_province?: string;
  return_district?: string;
  return_tel?: string;
  return_email?: string;
  
}

// Interface chính lưu toàn bộ data giao hàng
interface DataGiaoHang {
  products: ISanPham_GH[];
  order: IGiaoHang;
}


const OrderList = () => {
  const [ifGiaoHang, setIfGiaoHang] = useState<IGiaoHang>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [dataGiaoHang, setDataGiaoHang] = useState<DataGiaoHang>()

  // gọi api
  const fetchIfGiaoHang = async (id:string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/giao_hang/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(`Lỗi API: ${res.status}`);


    if (!data || Object.keys(data).length === 0) {
      throw new Error("Không có dữ liệu đơn hàng!");
    }
      return data
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  const handleBtnGiaoHang= async (id:string)=>{
    const data = await fetchIfGiaoHang(id)
    console.log("check data",data);
    const products: ISanPham_GH[] = data.products.map((item: any) => ({
      name: item.name,
      weight: item.weight,
      quantity: item.quantity,
      product_code: item.product_code,
    }));
    const totalValue = data.order.reduce((sum: number, item: any) => 
      sum + (item.gia_tien * item.so_luong), 0
    );
    const dataGH = {
      products:products,
      order:{
      id:data.order.ma_don_hang,
      value:totalValue,
      pick_name: "anh duy",
      pick_address: "489/10 đường đoàn văn bơ, phường 13 ,quận 4,Tp HCM",
      pick_province: "Tp HCMHCM",
      pick_district: "quận 4",
      pick_ward: "phường 13",      
      pick_tel: "0368196092",

      pick_date: new Date().toISOString().split("T")[0], // Ngày hiện tại (hoặc lấy từ API nếu có)
      pick_money: 0, // Giá trị mặc định (hoặc lấy từ API nếu có)
      note: data.order.ghi_chu || "Không có ghi chú", // Nếu không có thì đặt mặc định
      transport: "road", // Hoặc lấy từ API
      pick_option: "cod", // Hoặc lấy từ API
      deliver_option: "none", // Hoặc lấy từ API

      tel: data.order.sdt_giao_hang,
      name: 'anh phát',
      address:data.order.dia_chi_giao_hang ,
      province: data.order.tinh_giao_hang,        
      district: data.order.quan_giao_hang,
      ward: data.order.phuong_giao_hang,
      street:data.order.duong_giao_hang,
      hamlet: "Khác",
      email:'nguyenanhduy224488@TbBrandGmail.com',
      return_name: "anh duy",
      return_address: "489/10 đường đoàn văn bơ, phường 13 ,quận 4,Tp HCM",
      return_province: "Tp HCM",
      return_district: "quận 4",
      return_tel: "0368196092", 
      return_email: "anhduynguyenkhuat@gmail.com", 
      
      }
    }
    setDataGiaoHang(dataGH)
    const resDangDonGhtk = await fetch(`http://localhost:3000/api/ghtk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataGiaoHang),
    });
  }
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/don-hang");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  //
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto ">

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left">Mã Đơn Hàng</th>
            <th className="py-3 px-6 text-left">Ngày Đặt</th>
            <th className="py-3 px-6 text-left">Tổng Tiền</th>
            <th className="py-3 px-6 text-left">Trạng Thái</th>
            <th className="py-3 px-6 text-left">Thanh Toán</th>
            <th className="py-3 px-6 text-left">Ghi Chú</th>
            <th className="py-3 px-6 text-left"></th>
         
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.ma_don_hang} className="border-b border-gray-200">
              <td className="py-3 px-6">{order.ma_don_hang}</td>
              <td className="py-3 px-6">{new Date(order.ngay_dat_hang).toLocaleDateString()}</td>
              <td className="py-3 px-6">{order.tong_tien_don_hang.toLocaleString()} đ</td>
              <td className="py-3 px-6">{order.trang_thai_don_hang || "Chưa cập nhật"}</td>
              <td className="py-3 px-6">{order.thanh_toan_thanh_cong ? "✔️" : "❌"}</td>
              <td className="py-3 px-6">{order.ghi_chu || "Không có"}</td>
              <td className="py-3 px-6"><Button variant="outline" onClick={()=>handleBtnGiaoHang(order.ma_don_hang)} className=" bg-green-800 text-white">Giao Hàng</Button></td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;