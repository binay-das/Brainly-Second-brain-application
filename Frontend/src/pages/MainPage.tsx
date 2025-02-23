import { useEffect, useRef, useState } from "react";
import { NewContentModal } from "../components/NewContentModal";
import { Sidebar } from "../components/Sidebar";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { PlusIcon } from "../components/ui/icons/PlusIcon";
import { ShareIcon } from "../components/ui/icons/ShareIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ShareBrainModal } from "../components/ShareBrainModal";

export const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [cardData, setCardData] = useState<CardData[]>([]);

  const [greeting, setGreeting] = useState<string>("");

  const searchRef = useRef<HTMLInputElement | null>(null);

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
    } catch (err) {
      console.error(err);
    }
    setIsModalOpen(false);
  };

  const getGreeting = (): string => {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 5 && hours < 12) return "Good Morning";
    if (hours >= 12 && hours < 17) return "Good Afternoon";
    if (hours >= 17 && hours < 21) return "Good Evening";
    return "Good Night";
  }

  useEffect(() => {
    setGreeting(getGreeting());
    getCardData();
  }, []);

  return (
    <div className="w-full">
      {/* <Topbar className="w-screen h-16 fixed top-0 z-9" /> */}
      <NewContentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshContent={getCardData}
      />
      <ShareBrainModal
        open={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
      <div className="flex w-full">
        <Sidebar onChange={() => console.log('Key pressed to search')} />
        <div className="flex flex-col w-screen p-4 bg-[#191919] text-[#D4D4D4]">
        <h1 className="mb-2 text-center text-4xl font-bold">{greeting}, User</h1>
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-wide">Your second brain</h1>
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
          <div className="w-full flex flex-wrap mt-4 justify-betwee">
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
