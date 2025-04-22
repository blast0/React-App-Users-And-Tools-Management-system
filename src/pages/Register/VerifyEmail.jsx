import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { InputOTPPattern } from "@/components/ui/input-otp";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import axios from "axios";

const VerifyEmail = () => {
  const location = useLocation();
  const fetchOtp = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/getOtp", {
        email: location.state.email,
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchOtp();
  }, []);

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const handleLoginSubmit = async () => {
    const formData = {
      email: location.state.email,
      otp,
    };
    try {
      const verifyEmailViaOtp = await axios.post(
        "http://localhost:3000/api/v1/verify",
        formData
      );
      if (verifyEmailViaOtp.data.user.isVerified) {
        localStorage.setItem(
          "auth",
          JSON.stringify(verifyEmailViaOtp.data.token)
        );
        toast.success("Verification successfull");
        navigate("/dashboard");
      }
    } catch (err) {
      // console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="otpInput w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-3 items-center">
        <InputOTPPattern
          onChange={(value) => {
            setOtp(Number(value));
          }}
        />
        <div className="flex gap-2">
          <Title title={"Undo last action"}>
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={(value) => handleLoginSubmit(value)}
            >
              Verify Email
            </Button>
          </Title>
          <Title title={"Undo last action"}>
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={() => {}}
            >
              <Link to="/dashboard"> Skip For Now</Link>
            </Button>
          </Title>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
