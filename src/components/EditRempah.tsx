import { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthProvider";
import axiosInstance from "../utils/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";

const EditRempah = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    namaRempah: "",
    hargaRempah: "",
  });

  useEffect(() => {
    const fetchRempah = async () => {
      try {
        const response = await axiosInstance.get(`/api/rempah/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        const rempah = response.data;
        setFormData({
          namaRempah: rempah.namaRempah,
          hargaRempah: rempah.hargaRempah.toString(),
        });
      } catch (error) {
        console.error("Error fetching spice:", error);
        navigate("/rempah");
      }
    };

    fetchRempah();
  }, [id, getToken, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.patch(
        `/api/rempah/${id}`,
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
      console.error("Error updating spice:", error);
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
      <h2 className="text-2xl font-bold mb-4">Edit Spice</h2>
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
          Update Spice
        </button>
      </form>
    </div>
  );
};

export default EditRempah; 