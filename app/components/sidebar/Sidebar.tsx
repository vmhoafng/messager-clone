import { User } from "@prisma/client";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileFooter";
import getCurrentUser from "@/app/actions/getCurrentUser";
export default async function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser as User} />
      <MobileSidebar />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}
