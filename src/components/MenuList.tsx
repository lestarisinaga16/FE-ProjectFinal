import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../utils/AuthProvider";
import axiosInstance from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

type MenuType = {
  id: number;
  namaMenu: string;
  hargaMenu: number;
};

const fetchMenuList = async (token: string | null) => {
  return await axiosInstance.get<MenuType[]>("/api/menu", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const deleteMenu = async (token: string | null, id: number) => {
  return await axiosInstance.delete(`/api/menu/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const MenuCard = ({ id, namaMenu, hargaMenu }: MenuType) => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteMenu(getToken(), id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuList"] });
    },
  });

  const handleEdit = () => {
    navigate(`/menu/edit/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      deleteMutation.mutate();
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">{namaMenu}</h2>
      <p className="text-lg font-bold text-indigo-600 mb-4">Rp {hargaMenu.toLocaleString()}</p>
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

const MenuList = () => {
  const { getToken } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["menuList"],
    queryFn: () => fetchMenuList(getToken())
  });
  const navigate = useNavigate();

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error loading menu items</div>;

  return (
    <div className="space-y-6 p-4">
      <div className="max-w-xl mx-auto mb-6">
        <button
          onClick={() => navigate("/menu/create")}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Add New Menu Item
        </button>
      </div>
      {data?.data.map((menu) => (
        <MenuCard
          key={menu.id}
          id={menu.id}
          namaMenu={menu.namaMenu}
          hargaMenu={menu.hargaMenu}
        />
      ))}
    </div>
  );
};

export default MenuList; 