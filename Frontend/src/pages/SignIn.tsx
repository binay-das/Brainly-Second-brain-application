import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { InputComponent } from "../components/ui/InputComponent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username: 'binayyy',
        password: 'password',
      });

      if (response) {
        const token = response.data.token;
        navigate('/home')
        // alert("Sign in successful");
        localStorage.setItem("token", token);
        return;

      } else {
        console.error("Unexpected error!");
        alert("Sign in failed");
        return;
      }
    } catch (error) {
      console.error(error);
      alert("Sign in failed");
      return;
    }
  };

  return (
    <div className="w-screen h-screen bg-amber-100 inline-flex justify-center items-center">
      <div className="py-8 px-16 shadow-2xl flex flex-col rounded-md bg-slate-100 gap-4 justify-center">
      <h1 className="text-center font-bold text-2xl tracking-wide my-4">Sign In</h1>
        <InputComponent placeholder="username" reference={usernameRef} />
        <InputComponent placeholder="password" reference={passwordRef} />
        <Button
          variant="secondary"
          text="Sign In"
          size="lg"
          onClick={handleSignIn}
        />
      </div>
    </div>
  );
};
