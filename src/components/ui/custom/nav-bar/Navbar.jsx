import React from "react";
import { House, UserRound, ChevronDown, Sun, Moon } from "lucide-react";
import { MenuButton } from "@/components/ui/custom/menu-button";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ACCOUNT = [
  {
    name: "Edit Profile",
    tooltip: "Account Setting",
    icon: "icon-setting",
    value: "",
    checked: false,
  },
  {
    name: "Logout",
    tooltip: "Upload Image from Desktop",
    icon: "icon-fs-image",
    value: "Logout",
  },
  {
    name: "Switch Account",
    tooltip: "Upload Image from Desktop",
    icon: "icon-fs-image",
    value: "",
  },
  {
    name: "Add another Account",
    tooltip: "Upload Image from Desktop",
    icon: "icon-fs-image",
    value: "",
  },
];

const Navbar = ({ data, theme, setTheme }) => {
  const navigate = useNavigate();
  return (
    <div
      className="NavBar"
      style={{
        width: "100%",
        height: "60px",
        backgroundColor: theme === "light" ? "#0078d4" : "#212121",
        display: "flex",
        gap: "30px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="cursor-pointer ml-5">
        <House color="white" />
      </div>

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
          <Button
            size="icon-xs"
            variant="outline"
            className="flex items-center gap-0 cursor-pointer"
          >
            <UserRound />
            <ChevronDown />
          </Button>
        </MenuButton>
      </div>
    </div>
  );
};

export default Navbar;
