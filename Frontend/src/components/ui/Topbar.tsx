import { useEffect, useState } from "react";
import { HamburgerIcon } from "./icons/HamburgerIcon";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Topbar = () => {
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const findToken = () => {
    setToken(localStorage.getItem("token"));
  };
  useEffect(() => {
    findToken();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/signin");
  };

  return (
    <div className="flex justify-between items-center p-8 gap-4 bg-slate-400 w-full h-16 fixed top-0 z-9">
      <div className="flex gap-4">
        <HamburgerIcon />
        <h1>Brainly</h1>
      </div>
      {token ? (
        <Button
          size="md"
          variant="primary"
          text="LogOut"
          onClick={handleLogOut}
        ></Button>
      ) : (
        <Button
          size="md"
          variant="primary"
          text="LogIn"
          onClick={() => navigate("/signin")}
        ></Button>
      )}
    </div>
  );
};
