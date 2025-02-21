import { useEffect, useState } from "react";
import { NewContentModal } from "../components/NewContentModal";
import { Sidebar } from "../components/Sidebar";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { PlusIcon } from "../components/ui/icons/PlusIcon";
import { ShareIcon } from "../components/ui/icons/ShareIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ShareBrainModal } from "../components/ShareBrainModal";
import { Topbar } from "../components/Topbar";

export const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [cardData, setCardData] = useState<CardData[]>([]);

  interface CardData {
    _id: string;
    title: string;
    link: string;
    type: "twitter" | "youtube" | "document" | "link";
  }

  const getCardData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCardData(response.data);
      console.log(response.data[0]._id);
    } catch (err) {
      console.error(err);
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    getCardData();
  }, []);

  return (
    <div className="max-w-screen">
      <Topbar className="w-screen h-16 fixed top-0 z-9" />
      <NewContentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshContent={getCardData}
      />
      <ShareBrainModal
        open={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      /> 
      <div className="flex mt-16 w-full border-4">
        <Sidebar />
        <div className="flex flex-col w-screen p-4 border-2 border-amber-300">
          <div className="w-full flex justify-between items-center border">
            <h1>All Notes</h1>
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
          <div className="w-full flex flex-wrap mt-4 border justify-betwee">
            
            {cardData.map((eachCardData, index) => (
              <div key={eachCardData._id} className="m-2">
                <Card
                  key={eachCardData.link || index}
                  {...eachCardData}
                  id={eachCardData._id}
                  deleteContent={() => {
                    axios
                      .delete(`${BACKEND_URL}/api/v1/content`, {
                        data: { contentId: eachCardData._id },

                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      })
                      .then(() => {
                        console.log("Content deleted successfully");
                        getCardData();
                      });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
