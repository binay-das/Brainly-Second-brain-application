import { useEffect, useState } from "react";
import { SidebarItem } from "./SidebarItem";
import { DocumentIcon } from "./ui/icons/DocumentIcon";
import { LinkIcon } from "./ui/icons/LinkIcon";
import { TagsIcon } from "./ui/icons/TagsIcon";
import { XIcon } from "./ui/icons/XIcon";
import { YoutubeIcon } from "./ui/icons/YoutubeIcon";
import { HamburgerIcon } from "./ui/icons/HamburgerIcon";
import { SearchIcon } from "./ui/icons/SearchIcon";
import { DeleteIcon } from "./ui/icons/DeleteIcon";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(
    window.matchMedia(query).matches
  );

  useEffect(() => {
    const isMatch = window.matchMedia(query);
    if (isMatch.matches !== matches) {
      setMatches(isMatch.matches);
    }

    const listener = () => setMatches(isMatch.matches);
    isMatch.addEventListener("change", listener);

    return () => {
      isMatch.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
};

export const Sidebar = ({onChange}: {
  onChange: () => void;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);

  return (
    <>
      <div
        className={`bg-[#202020] text-[#7F7F7F] min-h-screen transition-transform duration-300 ease-in-out pt-6 ${
          sidebarOpen ? "w-60" : "w-0 md:w-0"
        } 
    ${isDesktop ? "relative" : "fixed top-0 left-0 h-full z-40 shadow-lg"}
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} overflow-hidden`}
      >
        <div onClick={() => setSidebarOpen(!sidebarOpen)}>
          <HamburgerIcon size="lg" />
        </div>
        {!isDesktop && sidebarOpen && (
          <div
            className="p-2 cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <HamburgerIcon size="lg" />
          </div>
        )}
        <SidebarItem icon={<DeleteIcon size="md" />} title="Home" />
        
        <div className="flex justify-start items-center gap-2 text-sm font-bold m-2 pl-4 rounded cursor-pointer bg-gray-800">
          <SearchIcon size="lg" />
          <input type="text" className="w-full px-2 py-1" placeholder="Search your brain" onChange={onChange}/>
        </div>
        <SidebarItem icon={<DeleteIcon size="md" />} title="Brainly AI" />
        <SidebarItem icon={<DeleteIcon size="md" />} title="Messages" />
        <SidebarItem icon={<XIcon size="md" />} title="Tweet" />
        <SidebarItem icon={<YoutubeIcon size="md" />} title="Videos" />
        <SidebarItem icon={<DocumentIcon size="md" />} title="Documents" />
        <SidebarItem icon={<LinkIcon size="md"  />} title="Links" />
        <SidebarItem icon={<TagsIcon size="md"  />} title="Tags" />
      </div>
    </>
  );
};
