import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { InputComponent } from "../components/ui/InputComponent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const SignUp = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const confirmPasswordRef = useRef<HTMLInputElement>();

  const handleSubmit = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (password!== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

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
    <div className="w-screen h-screen bg-amber-100 inline-flex justify-center items-center">
      <div className="py-8 px-16 shadow-2xl flex flex-col rounded-md bg-slate-100 gap-4 justify-center">
        <h1 className="text-center font-bold text-2xl tracking-wide my-4">Sign Up</h1>
        <InputComponent placeholder="Username" reference={usernameRef} />
        <InputComponent placeholder="Password" reference={passwordRef} />
        <InputComponent placeholder="Confirm password" reference={confirmPasswordRef} />
        <Button
          variant="secondary"
          text="Sign Up"
          size="lg"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
