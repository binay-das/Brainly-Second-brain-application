import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Topbar } from "../components/Topbar";
import { NewContentModal } from "../components/NewContentModal";
import { ShareBrainModal } from "../components/ShareBrainModal";
import { Sidebar } from "../components/Sidebar";
import { Button } from "../components/ui/Button";
import { ShareIcon } from "../components/ui/icons/ShareIcon";
import { PlusIcon } from "../components/ui/icons/PlusIcon";

export const ContentPage = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  //   const [content, setContent] = useState<{
  //     title: string;
  //     description: string;
  //   } | null>(null);
  const [content, setContent] = useState();

  useEffect(() => {
    console.log("Content Page");
    getCardContent();
  }, []);
  const getCardContent = async () => {
    try {
      console.log(`${BACKEND_URL}/api/v1/content/${id}`);
      const response = await axios.get(`${BACKEND_URL}/api/v1/content/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const cardContent = response.data;
      console.log(cardContent);
      setContent(cardContent);
    } catch (error) {
      console.error(error);
    }
  };
  if (!content) return <p>Loading...</p>;
  return (
    <div>
      <Topbar className="w-screen h-16 fixed top-0 z-9" />
      <NewContentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshContent={getCardContent}
      />
      <ShareBrainModal
        open={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
      <div className="flex mt-16 w-full border-4">
        <Sidebar />
        <div className="flex flex-col w-screen p-4 border-2 border-amber-300">
          <div className="w-full flex justify-between items-center border">
            {/* <h1 className="">{content.title}</h1> */}
            <div className="flex gap-4">
              <Button
                variant="secondary"
                size="md"
                text="Share Brain"
                startIcon={<ShareIcon size="md" />}
                onClick={() => setIsShareModalOpen(true)}
              />
              <Button
                variant="primary"
                size="md"
                text="Add Content"
                startIcon={<PlusIcon size="md" />}
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
          <div className="w-full h-screen flex flex-col mt-4 border ">
            <h1 className="text-3xl font-bold text-cente">{content.title}</h1>
            <div>
                <p>{content.description}</p>
                <p>{content.link}</p>
                <p>{content.tags}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
