import { useState, useEffect } from "react";

export interface MeasurementFormData {
  chestSize?: number;
  neckSize?: number;
  bustSize?: number;
  waistSize?: number;
  hipSize?: number;
  shoulderWidth?: number;
  waistLength?: number;
  armLength?: number;
  armCircumference?: number;
  pantLength?: number;
  calfCircumference?: number;
  headCircumference?: number;
}

export interface MeasurementData extends MeasurementFormData {
  name: string;
}

interface MeasurementManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (measurements: MeasurementData[]) => void;
  initialMeasurements?: MeasurementData[];
}

const defaultMeasurement: MeasurementData = {
  name: "Số đo mới",
  chestSize: 0,
  neckSize: 0,
  bustSize: 0,
  waistSize: 0,
  hipSize: 0,
  shoulderWidth: 0,
  waistLength: 0,
  armLength: 0,
  armCircumference: 0,
  pantLength: 0,
  calfCircumference: 0,
  headCircumference: 0,
};

const MeasurementModal: React.FC<MeasurementManagerModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialMeasurements,
}) => {
  const [measurements, setMeasurements] = useState<MeasurementData[]>(
    initialMeasurements || []
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(
    initialMeasurements && initialMeasurements.length > 0 ? 0 : -1
  );
  const [formData, setFormData] = useState<MeasurementData>(
    initialMeasurements && initialMeasurements.length > 0
      ? initialMeasurements[0]
      : defaultMeasurement
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialMeasurements) {
      setMeasurements(initialMeasurements);
      if (initialMeasurements.length > 0) {
        setSelectedIndex(0);
        setFormData(initialMeasurements[0]);
      } else {
        setSelectedIndex(-1);
        setFormData(defaultMeasurement);
      }
    } else {
      // Lấy danh sách số đo từ localStorage nếu không có initialMeasurements
      const storedMeasurements = localStorage.getItem("measurements");
      if (storedMeasurements) {
        const parsedMeasurements: MeasurementData[] = JSON.parse(storedMeasurements);
        setMeasurements(parsedMeasurements);
        if (parsedMeasurements.length > 0) {
          setSelectedIndex(0);
          setFormData(parsedMeasurements[0]);
        }
      }
    }
  }, [initialMeasurements, isOpen]);

  if (!isOpen) return null;

  const handleSelectMeasurement = (index: number) => {
    setSelectedIndex(index);
    setFormData(measurements[index]);
  };

  const handleAddNew = () => {
    const newMeasurement: MeasurementData = {
      ...defaultMeasurement,
      name: `Số đo ${measurements.length + 1}`,
    };
    const updatedMeasurements = [...measurements, newMeasurement];
    setMeasurements(updatedMeasurements);
    setSelectedIndex(updatedMeasurements.length - 1);
    setFormData(newMeasurement);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "name" ? value : parseFloat(value) || 0,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const updatedMeasurements = [...measurements];
    updatedMeasurements[selectedIndex] = formData;
    setMeasurements(updatedMeasurements);

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch("/api/measurements", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedMeasurements),
        });
        if (!response.ok) {
          throw new Error("Không thể lưu số đo lên server");
        }
      } else {
        localStorage.setItem("measurements", JSON.stringify(updatedMeasurements));
      }
      onSubmit(updatedMeasurements);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Đã có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl transform transition-all duration-300">
        <h2 className="text-2xl font-semibold mb-4">Quản lý số đo</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-3 gap-6">
          {/* Cột danh sách số đo */}
          <div className="col-span-1 border-r pr-4">
            <h3 className="text-lg font-semibold mb-2">Danh sách số đo</h3>
            <ul className="space-y-2">
              {measurements.map((measurement, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleSelectMeasurement(index)}
                    className={`w-full text-left px-3 py-2 border rounded ${
                      index === selectedIndex
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {measurement.name}
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleAddNew}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded w-full"
            >
              Thêm số đo mới
            </button>
          </div>
          {/* Cột form chỉnh sửa số đo */}
          <div className="col-span-2">
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block mb-1">Tên số đo</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                {/* Cột trái của form số đo */}
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1">Vòng ngực</label>
                    <input
                      type="number"
                      step="0.1"
                      name="chestSize"
                      value={formData.chestSize}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Vòng cổ</label>
                    <input
                      type="number"
                      step="0.1"
                      name="neckSize"
                      value={formData.neckSize}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Vòng bát ngực</label>
                    <input
                      type="number"
                      step="0.1"
                      name="bustSize"
                      value={formData.bustSize}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Vòng eo</label>
                    <input
                      type="number"
                      step="0.1"
                      name="waistSize"
                      value={formData.waistSize}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Vòng mông</label>
                    <input
                      type="number"
                      step="0.1"
                      name="hipSize"
                      value={formData.hipSize}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                {/* Cột phải của form số đo */}
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1">
                      Vai (chiều rộng vai)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="shoulderWidth"
                      value={formData.shoulderWidth}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Chiều dài eo</label>
                    <input
                      type="number"
                      step="0.1"
                      name="waistLength"
                      value={formData.waistLength}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Chu vi tay</label>
                    <input
                      type="number"
                      step="0.1"
                      name="armCircumference"
                      value={formData.armCircumference}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Chiều dài quần</label>
                    <input
                      type="number"
                      step="0.1"
                      name="pantLength"
                      value={formData.pantLength}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Chu vi bắp chân</label>
                    <input
                      type="number"
                      step="0.1"
                      name="calfCircumference"
                      value={formData.calfCircumference}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Chu vi đầu</label>
                    <input
                      type="number"
                      step="0.1"
                      name="headCircumference"
                      value={formData.headCircumference}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded"
                  disabled={loading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
                  disabled={loading}
                >
                  {loading && <span className="loader mr-2" />}
                  Lưu số đo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementModal;
