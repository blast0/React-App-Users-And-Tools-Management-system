import { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../../components/ui/custom/nav-bar/Navbar";
import Designer from "../FabricEditor/designer";
import { verifyToken } from "../../helper";

const Dashboard = () => {
  const auth = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : "";
  const [token, setToken] = useState(auth);
  const [data, setData] = useState({});
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();

  const fetchLuckyNumber = async () => {
    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/dashboard",
        axiosConfig
      );
      setData({ msg: response.data.msg, luckyNumber: response.data.secret });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // fetchLuckyNumber();
    const { isTokenValid, error } = verifyToken(token);
    if (isTokenValid && !error) {
      // toast.success("You already logged in");
      navigate("/dashboard");
    } else if (error !== null) {
      toast.error(error);
      navigate("/login");
    } else {
      toast.error("Token Expired");
      navigate("/login");
    }
  }, [token]);

  return (
    <>
      <Navbar data={data} theme={theme} setTheme={setTheme} />
      <Designer theme={theme} />
    </>
  );
};

export default Dashboard;
