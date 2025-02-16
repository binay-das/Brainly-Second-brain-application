import { useNavigate } from "react-router-dom";

export default function () {
    const navigate = useNavigate();
  return (
    <div className="border w-screen h-screen bg-gray-300">
      <div className="flex flex-col gap-2 justify-center items-center h-full text-center">
        <h1 className="text-7xl font-medium mb-4">Unleash the power of Brainly.com</h1>
        <h3 className="text-xl">Got not time to visit some urls, its ok, save them here!</h3>
        <h3 className="text-xl">Got not time to watch a youtube video, its ok, just share here!</h3>
        <h3 className="text-xl">Got not time to read a tweets, its ok, just share here!</h3>
        <button className="bg-gray-500 rounded-md px-4 py-2 text-white text-xl cursor-pointer" onClick={() => navigate('/home')}>Let's go</button>
      </div>
    </div>
  );
}
