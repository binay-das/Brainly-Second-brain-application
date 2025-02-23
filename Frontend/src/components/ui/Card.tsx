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
    <div className="h-44 w-44  text-gray-300 rounded-3xl shadow-md cursor-pointer">
      <div className="h-1/3 w-full px-2 bg-[#2C2C2C]  rounded-t-3xl flex justify-between">
        <div className="flex items-center gap-2 ">
          {props.type == "twitter" ? (
            <XIcon size="lg" />
          ) : props.type == "youtube" ? (
            <YoutubeIcon size="lg" />
          ) : props.type == "document" ? (
            <DocumentIcon size="lg" />
          ) : (
            <LinkIcon size="lg" />
          )}
        </div>
        <div className="flex items-center gap-2 opacity-50">
          <ShareIcon size="md" />
          <div onClick={props.deleteContent}>
            <DeleteIcon size="md" />
          </div>
        </div>
      </div>

      <div className="h-2/3 w-full px-2 bg-[#252525] rounded-b-3xl   relative">
        <div
          className="w-full h-full px-2  "
          onClick={() => navigate(`/content/${props.id}`)}
        >
          <div className="text-md font-medium  ">{props.title}</div>
          <div className=" w-full text-xs mt-1 opacity-50 line-clamp-2  ">
            {props.description}
          </div>
          <div className="absolute bottom-0 left-0 w-full text-xs text-gray-400 p-1">{props.tags?.join(", ")}</div>
        </div>
      </div>
    </div>
  );
};
