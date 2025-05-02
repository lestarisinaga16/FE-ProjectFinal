import { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthProvider";
import axiosInstance from "../utils/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";

const EditKaryawan = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    namaKaryawan: "",
    jenisKelamin: "Laki-laki",
    tanggalMasuk: "",
  });

  useEffect(() => {
    const fetchKaryawan = async () => {
      try {
        const response = await axiosInstance.get(`/api/karyawan/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        const karyawan = response.data;
        setFormData({
          namaKaryawan: karyawan.namaKaryawan,
          jenisKelamin: karyawan.jenisKelamin,
          tanggalMasuk: karyawan.tanggalMasuk,
        });
      } catch (error) {
        console.error("Error fetching employee:", error);
        navigate("/karyawan");
      }
    };

    fetchKaryawan();
  }, [id, getToken, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.patch(
        `/api/karyawan/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      );
      navigate("/karyawan");
    } catch (error) {
      console.error("Error updating employee:", error);
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
      <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
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
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditKaryawan; 