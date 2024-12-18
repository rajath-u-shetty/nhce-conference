import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import SidebarItems from "./SidebarItems";
import { Avatar, AvatarFallback } from "./ui/avatar";

import { AuthSession, getUserAuth } from "@/lib/auth/utils";
import { AvatarImage } from "@radix-ui/react-avatar";

const Sidebar = async () => {
  const session = await getUserAuth();
  if (session.session === null) return null;

  return (
    <aside className="h-screen max-w-24  hidden md:block p-4 pt-8 border-r dark:border-border border-gray-800 shadow-inner">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold ml-4"></h3>
          <SidebarItems />
        </div>
        <UserDetails session={session} />
      </div>
    </aside>
  );
};

export default Sidebar;

const UserDetails = ({ session }: { session: AuthSession }) => {
  if (session.session === null) return null;
  const { user } = session.session;

  if (!user?.name || user.name.length == 0) return null;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-2 px-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} alt={user.name} />
            <AvatarFallback className="bg-gray-800 border-black text-white border-2 text-muted-foreground">
              {user.name?.split(" ").map((word) => word[0].toUpperCase()).join("") ?? "~"}
            </AvatarFallback>
          </Avatar>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <Link href="/account" className="block">
          <div className="flex items-center space-y-2">
            <div className="text-muted-foreground">
              <p className="text-sm font-medium">{user.name ?? "John Doe"}</p>
              <p className="text-xs">{user.email ?? "john@doe.com"}</p>
            </div>
          </div>
        </Link>
      </HoverCardContent>
    </HoverCard>
  );
};
