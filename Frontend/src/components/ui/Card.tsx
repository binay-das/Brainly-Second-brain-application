import { DocumentIcon } from "./icons/DocumentIcon";
import { LinkIcon } from "./icons/LinkIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { XIcon } from "./icons/XIcon";
import { DeleteIcon } from "./icons/DeleteIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "document" | "link";
}

export const Card = (props: CardProps) => {
  return (
    <div className="inline-flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md shadow-md w-66">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          {props.type == "twitter" ? (
            <XIcon />
          ) : props.type == "youtube" ? (
            <YoutubeIcon />
          ) : props.type == "document" ? (
            <DocumentIcon />
          ) : (
            <LinkIcon />
          )}
          <p>{props.title}</p>
        </div>
        <div className="flex items-center gap-2 opacity-50">
          <ShareIcon size="md" />
          <DeleteIcon />
        </div>
      </div>
      <div className="w-full mt-4">
        
      </div>
    </div>
  );
};
