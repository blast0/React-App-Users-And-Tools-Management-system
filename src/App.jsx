import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Dashboard,
  HomeLayout,
  Landing,
  Login,
  Logout,
  Register,
} from "./pages";
// import { Toaster } from "@/components/ui/sonner";
import { ToastContainer, toast } from "react-toastify";
import Spin from "./components/ui/custom/spinner";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
]);

function App() {
  return (
    <div id="popmenu-container" className="w-[100%] h-[100%]">
      {/* <Toaster position="top-center" /> */}
      <ToastContainer position="top-center" />
      <Spin id="root" overlayProps={{ position: "fixed" }} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
