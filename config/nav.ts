import { SidebarLink } from "@/components/SidebarItems";
import { Shield, User, HomeIcon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/account", title: "Account", icon: User },
];

export const adminLinks: SidebarLink[] = [
  { href: "/admin", title: "Admin", icon: Shield },
];

export const additionalLinks: AdditionalLinks[] = [];

