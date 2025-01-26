import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { InputComponent } from "../components/ui/InputComponent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const SignUp = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const handleSubmit = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });
      alert("Signed up successfully!");

    } catch (error) {
      console.error(error);
      alert("Failed to sign up. Please try again.");
      return;
    }
  };

  return (
    <div className="w-screen h-screen">
      <InputComponent placeholder="username" reference={usernameRef} />
      <InputComponent placeholder="password" reference={passwordRef} />
      <Button
        variant="secondary"
        text="Sign Up"
        size="lg"
        onClick={handleSubmit}
      />
    </div>
  );
};
