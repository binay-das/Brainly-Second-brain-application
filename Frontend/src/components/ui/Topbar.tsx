import { useEffect, useState } from "react";
import { HamburgerIcon } from "./icons/HamburgerIcon";
import { Button } from "./Button";

export const Topbar = () => {
    const [token, setToken] = useState<string | null>(null);
    const findToken = () => {
        // Logic to find and return the JWT token
        setToken(localStorage.getItem("token"));
    }
    useEffect(() => {
        findToken();
    }, []);
  return (
    <div className="flex justify-between items-center p-8 gap-4 bg-slate-400 w-full h-16 fixed top-0 z-9">
      <div className="flex gap-4">
        <HamburgerIcon />
        <h1>Brainly</h1>
      </div>
      {token && <Button size="md" variant="primary" text="LogOut"></Button>}
    </div>
  );
};
