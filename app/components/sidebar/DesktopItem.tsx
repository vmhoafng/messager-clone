"use client";

import clsx from "clsx";
import Link from "next/link";
interface DesktopItemProps {
  label: string;
  href: string;
  icon: any;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
            flex
            gap-3
            rounded-md
            text-sm
            leading-6
            font-semibold
            hover:text-black
            hover:bg-gray-100
            group`,
          active ? "text-black bg-gray-100" : "text-gray-500"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};
export default DesktopItem;
