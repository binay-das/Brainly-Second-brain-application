import { DocumentIcon } from "./icons/DocumentIcon";
import { LinkIcon } from "./icons/LinkIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { XIcon } from "./icons/XIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { Link, useNavigate } from "react-router-dom";

interface CardProps {
  id: string;
  title: string;
  link: string;
  description?: string;
  type: "twitter" | "youtube" | "document" | "link";
  tags?: string[];
  deleteContent: () => void;
}

export const Card = (props: CardProps) => {
  const navigate = useNavigate();
  return (
    <div className="h-40 w-40  bg-gray-600 text-gray-300 rounded-2xl shadow-md cursor-pointer">
      <div className="h-1/3 w-full px-2 bg-[#2C2C2C]  rounded-t-2xl flex justify-between">
        <div className="flex items-center gap-2 ">
          {props.type == "twitter" ? (
            <XIcon />
          ) : props.type == "youtube" ? (
            <YoutubeIcon />
          ) : props.type == "document" ? (
            <DocumentIcon />
          ) : (
            <LinkIcon />
          )}
        </div>
        <div className="flex items-center gap-2 opacity-50">
          <ShareIcon size="md" />
          <div onClick={props.deleteContent}>
            <DeleteIcon />
          </div>
        </div>
      </div>

      <div className="h-2/3 w-full px-2 bg-[#252525] rounded-b-2xl">
        <div
          className="w-full h-full p-2"
          onClick={() => navigate(`/content/${props.id}`)}
        >
          <div className="text-md font-medium">{props.title}</div>
          <div className="h-1/2 w-full text-xs mt-1 opacity-50 line-clamp-2">
            {props.description}
          </div>
          
          <div>{props.tags}</div>
        </div>
      </div>
    </div>
  );
};
