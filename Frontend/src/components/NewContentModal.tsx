import { useRef } from "react";
import { Button } from "./ui/Button";
import { CloseIcon } from "./ui/icons/CloseIcon";
import { InputComponent } from "./ui/InputComponent";
import axios from "axios";

interface NewContentModalProps {
  open: boolean;
  onClose: () => void;
}

export const NewContentModal = ({ open, onClose }: NewContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();

  const newContent = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/api/v1/content",
        {
          title: titleRef.current?.value,
          link: linkRef.current?.value,
          type: "youtube",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-gray-700 opacity-85 fixed flex justify-center items-center z-99">
          <div className="bg-white opacity-100 flex flex-col justify-center items-center py-4 px-8 rounded-md">
            <div onClick={onClose} className={"flex justify-end w-full mb-4"}>
              <CloseIcon className={""} />
            </div>
            <div className="flex flex-col gap-4">
              <InputComponent placeholder={"Title"} reference={titleRef} />
              <InputComponent placeholder={"Link"} reference={linkRef} />
              <Button
                variant="primary"
                size="md"
                text="Add Content"
                onClick={newContent}
              />
              <div>
                <input type="radio" name="youtube" id="youtube" />
                <label htmlFor="youtube">Youtube Video</label>
                <input type="radio" name="twitter" id="twitter" />
                <label htmlFor="twitter">Tweet</label>
                <input type="radio" name="document" id="document" />
                <label htmlFor="document">Document</label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
