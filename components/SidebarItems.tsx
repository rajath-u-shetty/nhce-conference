"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { defaultLinks, adminLinks, additionalLinks } from "@/config/nav";
import { useSession } from "next-auth/react";

export interface SidebarLink {
  title: string;
  href: string;
  icon: LucideIcon;
}

const SidebarItems = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const allLinks = isAdmin ? [...defaultLinks, ...adminLinks] : defaultLinks;

  return (
    <>
      <SidebarLinkGroup links={allLinks} />
      {additionalLinks.length > 0 &&
        additionalLinks.map((group, index) => (
          <SidebarLinkGroup
            key={group.title}
            links={group.links}
            title={group.title}
            border={index !== additionalLinks.length - 1}
          />
        ))}
    </>
  );
};

export default SidebarItems;

const SidebarLinkGroup = ({
  links,
  title,
  border,
}: {
  links: SidebarLink[];
  title?: string;
  border?: boolean;
}) => {
  const fullPathname = usePathname();
  const pathname = "/" + fullPathname.split("/")[1];

  return (
    <div className={cn("flex flex-col space-y-2", border && "border-b pb-4")}>
      {title && <div className="px-2 text-xs font-semibold uppercase">{title}</div>}
      {links.map((link) => (
        <SidebarLink
          key={link.href}
          link={link}
          active={pathname === link.href}
        />
      ))}
    </div>
  );
};

const SidebarLink = ({
  link,
  active,
}: {
  link: SidebarLink;
  active: boolean;
}) => {
  const Icon = link.icon;
  
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-center p-4 rounded-lg hover:bg-accent",
        active && "bg-accent"
      )}
      title={link.title} // Added tooltip to show title on hover
    >
      <Icon className="h-5 w-5 my-4" />
    </Link>
  );
};
