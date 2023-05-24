"use client"
import React from "react";
import DesktopItem from "./DesktopItem";
import { useState } from "react";
import useRoutes from "@/app/hooks/useRoutes";
export default function DesktopSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const routes = useRoutes();
  return (
    <div
      className="
        hidden  
        lg: fixed
        lg:inset-y-0
        lg:left-0
        lg:z-40
        lg:w-20
        xl:px-6
        lg:overflow-y-auto
        lg:bg-white
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between"
    >
      <nav
        className="
            mt-4
            flex
            flex-col
            justify-between"
      >
        <ul
          role="list"
          className="
            flex
            flex-col
            items-center
            space-y-1"
        >
          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.href}
              label={item.label}
              active={item.active}
              icon={item.icon}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
