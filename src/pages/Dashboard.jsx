import { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import FabricEditorPage from "./ImageEditor/canvasPage";

import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../components/ui/custom/nav-bar/Navbar";

const Dashboard = () => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );
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
      // console.log(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchLuckyNumber();
    if (token === "") {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }
  }, [token]);

  return (
    <>
      <Navbar data={data} theme={theme} setTheme={setTheme} />
      <FabricEditorPage theme={theme} />
    </>
  );
};

export default Dashboard;
