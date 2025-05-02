import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../utils/AuthProvider";
import axiosInstance from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

type KaryawanType = {
  id: number;
  namaKaryawan: string;
  jenisKelamin: string;
  tanggalMasuk: string;
};

const fetchKaryawanList = async (token: string | null) => {
  return await axiosInstance.get<KaryawanType[]>("/api/karyawan", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const deleteKaryawan = async (token: string | null, id: number) => {
  return await axiosInstance.delete(`/api/karyawan/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const KaryawanCard = ({ id, namaKaryawan, jenisKelamin, tanggalMasuk }: KaryawanType) => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteKaryawan(getToken(), id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["karyawanList"] });
    },
  });

  const handleEdit = () => {
    navigate(`/karyawan/edit/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteMutation.mutate();
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">{namaKaryawan}</h2>
      <p className="text-gray-700 mb-2">
        <span className="font-medium">Jenis Kelamin:</span> {jenisKelamin}
      </p>
      <p className="text-gray-700 mb-4">
        <span className="font-medium">Tanggal Masuk:</span> {new Date(tanggalMasuk).toLocaleDateString('id-ID')}
      </p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const KaryawanList = () => {
  const { getToken } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["karyawanList"],
    queryFn: () => fetchKaryawanList(getToken())
  });
  const navigate = useNavigate();

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error loading employees</div>;

  return (
    <div className="space-y-6 p-4">
      <div className="max-w-xl mx-auto mb-6">
        <button
          onClick={() => navigate("/karyawan/create")}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Add New Employee
        </button>
      </div>
      {data?.data.map((karyawan) => (
        <KaryawanCard
          key={karyawan.id}
          id={karyawan.id}
          namaKaryawan={karyawan.namaKaryawan}
          jenisKelamin={karyawan.jenisKelamin}
          tanggalMasuk={karyawan.tanggalMasuk}
        />
      ))}
    </div>
  );
};

export default KaryawanList; 