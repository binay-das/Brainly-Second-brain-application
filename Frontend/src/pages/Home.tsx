import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function () {
    const navigate = useNavigate();
  return (
    <div className="w-screen h-screen bg-[#191919] text-[#D4D4D4]">
      <div className="flex flex-col gap-2 justify-center items-center h-full text-center">
        <h1 className="text-7xl font-medium mb-4">Unleash the power of Brainly.com</h1>
        <h3 className="">Got not time to visit some urls, its ok, save them here!</h3>
        <h3 className="">Got not time to watch a youtube video, its ok, just share here!</h3>
        <h3 className="">Got not time to read a tweets, its ok, just share here!</h3>
        <Button variant="primary" size="lg" text="Lets go" onClick={() => navigate('/home')} />
      </div>
    </div>
  );
}
