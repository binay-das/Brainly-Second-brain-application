import { Sidebar } from "../components/Sidebar";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { PlusIcon } from "../components/ui/icons/PlusIcon";
import { ShareIcon } from "../components/ui/icons/ShareIcon";

export const MainPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col ml-60 w-full p-4">
        <div className="flex justify-between items-center">
          <h1>All Notes</h1>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              size="md"
              text="Share Brain"
              startIcon={<ShareIcon size="md" />}
            />
            <Button
              variant="primary"
              size="md"
              text="Add Content"
              startIcon={<PlusIcon size="md" />}
            />
          </div>
        </div>

        <div className="w-full flex gap-4 mt-4">
            <Card title="Project Ideas" link="yt.com" type="youtube" />
            <Card title="How to build a Seond Brain" link="yt.com" type="document"  />
        </div>
      </div>
    </div>
  );
};
