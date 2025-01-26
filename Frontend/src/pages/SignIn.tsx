import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { InputComponent } from "../components/ui/InputComponent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const SignIn = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const handleSignIn = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });

      if (response) {
        const token = response.data.token;
        console.log("Sign in successful", token);
        localStorage.setItem("token", token);
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
    <div className="w-screen h-screen">
      <InputComponent placeholder="username" reference={usernameRef} />
      <InputComponent placeholder="password" reference={passwordRef} />
      <Button
        variant="secondary"
        text="Sign In"
        size="lg"
        onClick={handleSignIn}
      />
    </div>
  );
};
