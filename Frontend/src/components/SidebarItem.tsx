import { ReactElement } from "react";

export const SidebarItem = (props: { icon: ReactElement; title: string }) => {
  return (
    <div className="flex justify-start items-center gap-2 text-sm font-bold py-1 px-2 m-2 rounded cursor-pointer hover:bg-gray-100 ">
      {props.icon}
      {props.title}
    </div>
  );
};
