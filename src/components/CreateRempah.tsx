import { useState } from "react";
import { useAuth } from "../utils/AuthProvider";
import axiosInstance from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

const CreateRempah = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaRempah: "",
    hargaRempah: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        "/api/rempah",
        {
          namaRempah: formData.namaRempah,
          hargaRempah: parseInt(formData.hargaRempah),
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      );
      navigate("/rempah");
    } catch (error) {
      console.error("Error creating spice:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Spice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Rempah</label>
          <input
            type="text"
            name="namaRempah"
            value={formData.namaRempah}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Harga Rempah</label>
          <input
            type="number"
            name="hargaRempah"
            value={formData.hargaRempah}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Spice
        </button>
      </form>
    </div>
  );
};

export default CreateRempah; 