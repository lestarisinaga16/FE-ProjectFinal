import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { AuthProvider } from "./utils/AuthProvider";
import MenuList from "./components/MenuList";
import CreateMenu from "./components/CreateMenu";
import EditMenu from "./components/EditMenu";
import KaryawanList from "./components/KaryawanList";
import CreateKaryawan from "./components/CreateKaryawan";
import EditKaryawan from "./components/EditKaryawan";
import RempahList from "./components/RempahList";
import CreateRempah from "./components/CreateRempah";
import EditRempah from "./components/EditRempah";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<BaseLayout />}>
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Route>
        <Route path="/" element={<RootLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="menu"
            element={
              <PrivateRoute>
                <MenuList />
              </PrivateRoute>
            }
          />
          <Route
            path="menu/create"
            element={
              <PrivateRoute>
                <CreateMenu />
              </PrivateRoute>
            }
          />
          <Route
            path="menu/edit/:id"
            element={
              <PrivateRoute>
                <EditMenu />
              </PrivateRoute>
            }
          />
          <Route
            path="karyawan"
            element={
              <PrivateRoute>
                <KaryawanList />
              </PrivateRoute>
            }
          />
          <Route
            path="karyawan/create"
            element={
              <PrivateRoute>
                <CreateKaryawan />
              </PrivateRoute>
            }
          />
          <Route
            path="karyawan/edit/:id"
            element={
              <PrivateRoute>
                <EditKaryawan />
              </PrivateRoute>
            }
          />
          <Route
            path="rempah"
            element={
              <PrivateRoute>
                <RempahList />
              </PrivateRoute>
            }
          />
          <Route
            path="rempah/create"
            element={
              <PrivateRoute>
                <CreateRempah />
              </PrivateRoute>
            }
          />
          <Route
            path="rempah/edit/:id"
            element={
              <PrivateRoute>
                <EditRempah />
              </PrivateRoute>
            }
          />
        </Route>
      </Route>
    )
  );

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
