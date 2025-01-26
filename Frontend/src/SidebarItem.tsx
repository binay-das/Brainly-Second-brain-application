import { ReactElement } from "react";

export const SidebarItem = (props: { icon: ReactElement; title: string }) => {
  return (
    <div className="flex justify-start items-center gap-4 p-4 my-2 cursor-pointer hover:bg-gray-100 w-full">
      {props.icon}
      {props.title}
    </div>
  );
};
