import React from "react";
import {
  House,
  UserRound,
  ChevronDown,
  Sun,
  Moon,
  UserRoundPen,
  UserRoundX,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import { MenuButton } from "@/components/ui/custom/menu-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  // Link, useLocation,
  useNavigate,
} from "react-router-dom";
import { Button } from "@/components/ui/button";

const ACCOUNT = [
  {
    name: "Edit Profile",
    icon: <UserRoundPen />,
    value: "EditAccount",
  },
  {
    name: "Logout",
    icon: <UserRoundX />,
    value: "Logout",
  },
  {
    name: "Switch Account",
    icon: <UsersRound />,
    value: "SwitchAccount",
  },
  {
    name: "Add another Account",
    icon: <UserRoundPlus />,
    value: "AddAccount",
  },
];

const Navbar = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location);
  return (
    <div
      className="NavBar"
      style={{
        width: "100%",
        height: "60px",
        backgroundColor: theme === "light" ? "#0078d4" : "#212121",
        display: "flex",
        gap: "30px",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {/* <div className="cursor-pointer ml-5">
        <House color="white" />
      </div> */}

      <div className="flex mr-5 gap-5 justify-center items-center">
        <div
          className="cursor-pointer ml-5"
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
        >
          {theme === "light" ? <Moon color="white" /> : <Sun color="white" />}
        </div>
        <MenuButton
          title="Profile options"
          options={ACCOUNT}
          onSelect={(option) => {
            if (option.value === "Logout") {
              localStorage.removeItem("auth");
              navigate("/");
            }
          }}
        >
          <div className="flex items-end">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                <UserRound />
              </AvatarFallback>
            </Avatar>
            <ChevronDown color="white" />
          </div>
        </MenuButton>
      </div>
    </div>
  );
};

export default Navbar;
