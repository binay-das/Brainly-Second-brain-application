import { Button } from "./ui/Button";
import { CloseIcon } from "./ui/icons/CloseIcon";
import { InputComponent } from "./ui/InputComponent";

interface NewContentModalProps {
  open: boolean;
  onClose: () => void;
}

export const NewContentModal = ({ open, onClose }: NewContentModalProps) => {
  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-gray-700 opacity-85 fixed flex justify-center items-center z-99">
          <div className="bg-white opacity-100 flex flex-col justify-center items-center py-4 px-8 rounded-md">
            <div onClick={onClose} className={"flex justify-end w-full mb-4"}>
              <CloseIcon className={""} />
            </div>
            <div className="flex flex-col gap-4">
              <InputComponent placeholder={"Title"} />
              <InputComponent placeholder={"Link"} />
              <Button
                variant="primary"
                size="md"
                text="Add Content"
                onClick={() => console.log("Hi")}
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
