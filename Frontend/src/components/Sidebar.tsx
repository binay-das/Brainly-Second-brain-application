import { useEffect, useState } from "react";
import { SidebarItem } from "./SidebarItem";
import { DocumentIcon } from "./ui/icons/DocumentIcon";
import { LinkIcon } from "./ui/icons/LinkIcon";
import { TagsIcon } from "./ui/icons/TagsIcon";
import { XIcon } from "./ui/icons/XIcon";
import { YoutubeIcon } from "./ui/icons/YoutubeIcon";
import { HamburgerIcon } from "./ui/icons/HamburgerIcon";

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

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);

  return (
    <>
      <div onClick={() => setSidebarOpen(!sidebarOpen)}>
        <HamburgerIcon />
      </div>
      <div
        className={`bg-gray-200 min-h-screen transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "w-60" : "w-0 md:w-0"
        } 
    ${isDesktop ? "relative" : "fixed top-0 left-0 h-full z-40 shadow-lg"}
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} overflow-hidden`}
      >
        {!isDesktop && sidebarOpen && (
          <div
            className="p-2 cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <HamburgerIcon />
          </div>
        )}

        <SidebarItem icon={<XIcon />} title="Tweet" />
        <SidebarItem icon={<YoutubeIcon />} title="Videos" />
        <SidebarItem icon={<DocumentIcon />} title="Documents" />
        <SidebarItem icon={<LinkIcon />} title="Links" />
        <SidebarItem icon={<TagsIcon />} title="Tags" />
      </div>
    </>
  );
};
