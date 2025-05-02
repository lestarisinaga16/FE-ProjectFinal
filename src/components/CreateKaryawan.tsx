import { useState } from "react";
import { useAuth } from "../utils/AuthProvider";
import axiosInstance from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

const CreateKaryawan = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaKaryawan: "",
    jenisKelamin: "Laki-laki",
    tanggalMasuk: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        "/api/karyawan",
        formData,
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      );
      navigate("/karyawan");
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Karyawan</label>
          <input
            type="text"
            name="namaKaryawan"
            value={formData.namaKaryawan}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
          <select
            name="jenisKelamin"
            value={formData.jenisKelamin}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tanggal Masuk</label>
          <input
            type="date"
            name="tanggalMasuk"
            value={formData.tanggalMasuk}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default CreateKaryawan; 