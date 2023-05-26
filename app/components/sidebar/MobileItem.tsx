"use client";
import React from "react";
import Link from "next/link";
import clsx from "clsx";
interface MobileItemProps {
  href: string;
  active?: boolean;
  icon: any;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  active,
  icon: Icon,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        `
        group
        flex
        justify-center
        gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        p-4
        text-gray-500
        hover:text-black
        hover:bg-gray-100
      `,
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon />
    </Link>
  );
};
export default MobileItem;
