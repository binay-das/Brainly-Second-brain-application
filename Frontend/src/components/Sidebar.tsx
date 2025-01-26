import { SidebarItem } from "./SidebarItem"
import { XIcon } from "./ui/icons/XIcon"
import { YoutubeIcon } from "./ui/icons/YoutubeIcon"

export const Sidebar = () => {
    return <div className="w-60 h-screen bg-gray-200 fixed left-0 top-0">
        <SidebarItem icon={<XIcon />} title="X" />
        <SidebarItem icon={<YoutubeIcon />} title="YouTube" />
    </div>
}