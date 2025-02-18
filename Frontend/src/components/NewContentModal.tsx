import { useRef, useState } from "react";
import { Button } from "./ui/Button";
import { CloseIcon } from "./ui/icons/CloseIcon";
import { InputComponent } from "./ui/InputComponent";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface NewContentModalProps {
  open: boolean;
  onClose: () => void;
  refreshContent: () => void;
}

export const NewContentModal = ({
  open,
  onClose,
  refreshContent,
}: NewContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const [contentType, setContentType] = useState("youtube");

  const newContent = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          title: titleRef.current?.value,
          link: linkRef.current?.value,
          type: contentType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      refreshContent();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    open && (
      <div className="fixed inset-0 bg-gray-700 bg-opacity-85 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md shadow-lg w-96">
          <div className="flex justify-end mb-4">
            <button onClick={onClose}>
              <CloseIcon className={""} />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-2xl font-bold">Add new</h1>
            <InputComponent placeholder="Title" reference={titleRef} />
            <InputComponent placeholder="Link" reference={linkRef} />
            <div className="flex gap-2">
              {[
                { label: "YouTube", value: "youtube" },
                { label: "Tweet", value: "twitter" },
                { label: "Document", value: "document" },
              ].map(({ label, value }) => (
                <label key={value} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="contentType"
                    value={value}
                    checked={contentType === value}
                    onChange={() => setContentType(value)}
                  />
                  {label}
                </label>
              ))}
            </div>
            <Button
              variant="primary"
              size="md"
              text="Add Content"
              onClick={newContent}
            />
          </div>
        </div>
      </div>
    )
  );
};
