"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DesignConsultationBooking() {
  const router = useRouter();
  const [appointmentDate, setAppointmentDate] = useState("");
  const [notes, setNotes] = useState("");
  const [guestName, setGuestName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [warning, setWarning] = useState("");

  const maxAppointments = 3; // Số lượng lịch tối đa có thể đặt
  const [appointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    const storedCount = parseInt(localStorage.getItem("appointmentCount") || "0");
    setAppointmentCount(storedCount);
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    setAppointmentDate(e.target.value);

    const hours = selectedDate.getHours();
    if (hours < 9 || hours > 18) {
      setWarning("⚠️ Giờ hoạt động: 09:00 - 18:00. Vui lòng chọn thời gian trong khoảng này.");
    } else {
      setWarning("");
    }
  };

  const validatePhoneNumber = (phone: string) => {
    return /^[0-9]{10,11}$/.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (appointmentCount >= maxAppointments) {
      setMessage("⚠️ Bạn đã đạt đến giới hạn đặt lịch. Không thể đặt thêm.");
      return;
    }
  
    setLoading(true);
    setMessage("");
  
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentDate,
          notes,
          guestName: guestName || null,
          phoneNumber: phoneNumber || null,
          sdt: phoneNumber || null, // Thêm số điện thoại vào đúng key của Prisma
          guestName_: guestName || undefined, // Đúng key của Prisma
          status: "PENDING", // ✅ Thêm status mặc định
          appointmentType: "DESIGN_CONSULTATION",
        }),
      });
  
      const data = await res.json();
      console.log("Server response:", data);
  
      if (res.ok) {
        const newCount = appointmentCount + 1;
        localStorage.setItem("appointmentCount", newCount.toString());
        setAppointmentCount(newCount);
  
        setMessage("🎉 Đặt lịch tư vấn thành công!");
        setAppointmentDate("");
        setNotes("");
        setGuestName("");
        setPhoneNumber("");
  
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setMessage(`❌ Lỗi: ${data.error || "Không thể đặt lịch"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Có lỗi xảy ra khi đặt lịch tư vấn.");
    }
  
    setLoading(false);
  };
  

  return (
    <div className="font-sans min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Đặt lịch tư vấn thiết kế
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">
              Thời gian tư vấn
            </label>
            <input
              type="datetime-local"
              id="appointmentDate"
              value={appointmentDate}
              onChange={handleDateChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            />
            {warning && <p className="text-red-600 text-sm mt-1">{warning}</p>}
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Ghi chú (Yêu cầu, thông tin bổ sung)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              rows={3}
            ></textarea>
          </div>

          <div>
            <label htmlFor="guestName" className="block text-sm font-medium text-gray-700">
              Họ và tên (nếu chưa có tài khoản)
            </label>
            <input
              type="text"
              id="guestName"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Số điện thoại (nếu chưa có tài khoản)
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Đang đặt lịch..." : "Đặt lịch tư vấn"}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
}
