"use client"
import { fullMessageType } from "@/app/types";
interface BodyProps {
  message: Array<fullMessageType>;
}

const Body: React.FC<BodyProps> = ({ message }) => {
  return <div className="flex flex-1">Body</div>;
};

export default Body;
