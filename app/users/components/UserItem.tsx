import { User } from "@prisma/client";
import React from "react";
interface UserItemProps {
  key: string;
  item: User;
}
const UserItem: React.FC<UserItemProps> = ({ key, item }) => {
  return <div>UserItem</div>;
};
export default UserItem;
