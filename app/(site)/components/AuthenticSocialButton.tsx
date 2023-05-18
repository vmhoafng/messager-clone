import React from "react";
import { IconType } from "react-icons";
interface AuthenticSocialProps {
  icon: IconType;
  onClick: () => void;
}
const AuthenticSocialButton: React.FC<AuthenticSocialProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      title="button"
      type="button"
      onClick={onClick}
      className="
        inline-flex
        w-full
        justify-center
        rounded-md
        bg-white
        px-4
        py-2
        text-gray-500
        shadow-sm
        ring-1
        ring-inset
        ring-gray-300
        hover:ring-gray-50
        focus:outline-offset-0"
    >
      <Icon />
    </button>
  );
};
export default AuthenticSocialButton;
