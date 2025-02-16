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

  interface CardData {
    title: string;
    link: string;
    type: "twitter" | "youtube" | "document" | "link";
  }

  const [cardData, setCardData] = useState<CardData[]>([]);

  const getCardData = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    setCardData(response.data);
  };

  useEffect(() => {
    getCardData();
  }, []);

  return (
    <>
      <Topbar />
      <NewContentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ShareBrainModal
        open={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
      <div className="flex mt-16 w-full overflow-hidden">
        <Sidebar />
        <div className="flex flex-col w-full p-4">
          <div className="flex justify-between items-center">
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

          <div className="w-full flex gap-4 mt-4">
            {/* <Card title="Project Ideas" link="yt.com" type="youtube" />
            <Card
              title="How to build a Seond Brain"
              link="yt.com"
              type="document"
            /> */}

            {cardData.map((eachCardData) => (
              <div>
                <Card
                  title={eachCardData.title}
                  link={eachCardData.link}
                  type={eachCardData.type}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
