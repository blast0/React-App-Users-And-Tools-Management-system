import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Dashboard,
  HomeLayout,
  Landing,
  Login,
  Logout,
  Register,
} from "./pages";
import { ToastContainer } from "react-toastify";
import Spin from "./components/ui/custom/spinner";
import VerifyEmail from "./pages/Register/VerifyEmail";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        // index: true,
        path: "landing",
        element: <Landing />,
      },
      {
        // path: "login",
        index: true,
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
      {
        path: "verifyEmail",
        element: <VerifyEmail />,
      },
    ],
  },
]);

function App() {
  return (
    <div id="popmenu-container" className="w-[100%] h-[100%]">
      <ToastContainer position="top-center" />
      <Spin id="root" overlayProps={{ position: "fixed" }} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
