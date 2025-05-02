import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../utils/AuthProvider";
import axiosInstance from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

const DashboardCard = ({ title, count, color, icon, onClick }: { 
  title: string; 
  count: number; 
  color: string; 
  icon: string;
  onClick: () => void;
}) => (
  <div 
    className={`bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow ${color}`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{count}</p>
      </div>
      <div className="text-3xl">
        {icon}
      </div>
    </div>
  </div>
);

const Home = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const { data: menuData, isLoading: menuLoading } = useQuery({
    queryKey: ["menuCount"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/menu", {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      return response.data.length;
    }
  });

  const { data: karyawanData, isLoading: karyawanLoading } = useQuery({
    queryKey: ["karyawanCount"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/karyawan", {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      return response.data.length;
    }
  });

  const { data: rempahData, isLoading: rempahLoading } = useQuery({
    queryKey: ["rempahCount"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/rempah", {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      return response.data.length;
    }
  });

  if (menuLoading || karyawanLoading || rempahLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Total Menu"
            count={menuData || 0}
            color="hover:bg-blue-50"
            icon="🍽️"
            onClick={() => navigate("/menu")}
          />
          <DashboardCard
            title="Total Karyawan"
            count={karyawanData || 0}
            color="hover:bg-green-50"
            icon="👥"
            onClick={() => navigate("/karyawan")}
          />
          <DashboardCard
            title="Total Rempah"
            count={rempahData || 0}
            color="hover:bg-yellow-50"
            icon="🌿"
            onClick={() => navigate("/rempah")}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;