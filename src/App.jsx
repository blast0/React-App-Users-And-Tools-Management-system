import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Dashboard,
  HomeLayout,
  Landing,
  Login,
  Logout,
  Register,
} from "./pages";
import { ToastContainer, toast } from "react-toastify";
import Spin from "./components/ui/custom/spinner/spinner";

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
    <>
      <Spin id="root" overlayProps={{ position: "fixed" }} />
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
