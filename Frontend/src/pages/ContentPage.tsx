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
  interface Content {
    title: string;
    description: string;
    link: string;
    type: string;
  }

  const [content, setContent] = useState<Content | null>(null);

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
  const extractYouTubeID = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };
  const VIDEO_ID = content ? extractYouTubeID(content.link) : null;
  const extractTweetID = (url: string) => {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : null;
  };

  const TWEET_ID = content ? extractTweetID(content.link) : null;

  // Example usage
  // const url = "https://www.youtube.com/watch?v=M7lc1UVf-VE";
  // console.log(extractYouTubeID(url)); // Output: M7lc1UVf-VE

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
      <div className="flex mt-16 w-full ">
        <Sidebar onChange={() => console.log('Key pressed from control page')} />
        <div className="flex flex-col w-screen p-4 ">
          <div className="w-full flex justify-between items-center">
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
          <div className="w-full min-h-screen flex justify-center mt-4 bg-gray-900 text-white">
            <div className="w-2/3 md:mt-18">
              <div className="font-medium text-4xl">{content.title}</div>
              <div className="p-4">
                <div className="text-md pl-8 text-blue-300">{content.link}</div>
                <div className="w-full p-4 flex justify-center items-center ">
                  {content.type === "youtube" && (
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${VIDEO_ID}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  )}
                  {content.type === "twitter" && (
                    <blockquote className="twitter-tweet">
                    <a href={`https://twitter.com/username/status/${TWEET_ID}`}></a>
                  </blockquote>
                  )}

                </div>
                <div className="text-md pl-8">
                  `https://twitter.com/i/web/status/{TWEET_ID}{" "}
                  __________________ {content.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
