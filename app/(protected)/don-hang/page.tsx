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
  hamlet: string;
  is_freeship: string;     // Nếu đây là giá trị số hay chuỗi, bạn có thể đổi thành number nếu cần
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
      return data
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  const handleBtnGiaoHang= async (id:string)=>{
    const data = await fetchIfGiaoHang(id)
    console.log(data);
    const products: ISanPham_GH[] = data.order.map((item: any) => ({
      ma_san_pham: item.ma_san_pham,
      so_luong: item.so_luong,
      gia_tien: item.gia_tien,
      ma_so_do: item.ma_so_do,
    }));
    const totalValue = data.order.reduce((sum: number, item: any) => 
      sum + (item.gia_tien * item.so_luong), 0
    );
    // const dataGH = {
    //   products:[]
    //   orders:{
    //   id:data.ma_don_hang;
    //   value:totalValue;
    //   pick_name: "anh duyduy";
    //   pick_address: "489/10 đường đoàn văn bơ, phường 13 ,quận 4,Tp HCM";
    //   pick_province: "Tp HCMHCM";
    //   pick_district: "quận 4";
    //   pick_ward: "phường 13";       
    //   pick_tel: "0368196092";
    //   tel: ;
    //   name: ;
    //   address: ;
    //   province: ;        
    //   district: ;
    //   ward: ;
    //   hamlet: ;
    //   email:;
    //   return_name: "anh duyduy",
    //   return_address: "489/10 đường đoàn văn bơ, phường 13 ,quận 4,Tp HCM",
    //   return_province: "Tp HCM",
    //   return_district: "quận 4",
    //   return_tel: "0368196092", 
    //   return_email: "duyduy@example.com", 
    //   value: 500000, 
    //   }
    // }
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