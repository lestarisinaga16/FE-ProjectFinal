import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../utils/AuthProvider";
import axiosInstance from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

type RempahType = {
  id: number;
  namaRempah: string;
  hargaRempah: number;
};

const fetchRempahList = async (token: string | null) => {
  if (!token) throw new Error("No token provided");
  const response = await axiosInstance.get<RempahType[]>("/api/rempah", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

const deleteRempah = async (id: number, token: string | null) => {
  if (!token) throw new Error("No token provided");
  await axiosInstance.delete(`/api/rempah/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const RempahCard = ({ id, namaRempah, hargaRempah }: RempahType) => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteRempah(id, getToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rempahList"] });
    },
  });

  const handleEdit = () => {
    navigate(`/rempah/edit/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this spice?")) {
      deleteMutation.mutate();
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">{namaRempah}</h2>
      <p className="text-lg font-bold text-indigo-600 mb-4">Rp {hargaRempah.toLocaleString()}</p>
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

const RempahList = () => {
  const { getToken } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["rempahList"],
    queryFn: () => fetchRempahList(getToken())
  });
  const navigate = useNavigate();

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error loading spices</div>;

  return (
    <div className="space-y-6 p-4">
      <div className="max-w-xl mx-auto mb-6">
        <button
          onClick={() => navigate("/rempah/create")}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Add New Spice
        </button>
      </div>
      {data?.map((rempah) => (
        <RempahCard
          key={rempah.id}
          id={rempah.id}
          namaRempah={rempah.namaRempah}
          hargaRempah={rempah.hargaRempah}
        />
      ))}
    </div>
  );
};

export default RempahList; 