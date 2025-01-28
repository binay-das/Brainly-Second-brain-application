import { Button } from "./ui/Button";
import { CloseIcon } from "./ui/icons/CloseIcon";
import { ShareIcon } from "./ui/icons/ShareIcon";
import { InputComponent } from "./ui/InputComponent";

interface ShareBrainModalProps {
  open: boolean;
  onClose: () => void;
}

export const ShareBrainModal = ({ open, onClose }: ShareBrainModalProps) => {
  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-gray-700 opacity-85 fixed flex justify-center items-center z-99">
          <div className="bg-white opacity-100 flex flex-col justify-center items-center py-4 px-8 rounded-md">
            <div
              onClick={onClose}
              className={"flex justify-between w-full mb-4"}
            >
              <h1>Share Your Second Brain</h1>
              <CloseIcon className={""} />
            </div>
            <div className="flex flex-col gap-4">
              <h2>Share your entire collection of notes, documents, tweets and videos with others. They'll be able to import your content into their own Second Brain</h2>
              <Button
                variant="primary"
                size="md"
                text="Share Brain"
                startIcon={<ShareIcon size="md" />}
                onClick={() => console.log("Hi")}
              />
              <h3>3 items will be shared</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
