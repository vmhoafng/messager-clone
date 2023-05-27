import Sidebar from "../components/sidebar/Sidebar";
import getUsers from "@/app/actions/getUser";
import UserList from "./components/UserList";
import { User } from "@prisma/client";
export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    // @ts-ignore
    <Sidebar>
      <div className="h-full">
        <UserList items={users as Array<User>} />
        {children}
      </div>
    </Sidebar>
  );
}
