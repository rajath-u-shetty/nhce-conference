import { SidebarLink } from "@/components/SidebarItems";
import {  Shield, User, HomeIcon ,Send } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/account", title: "Account", icon: User },
  { href: "/submission", title: "Account", icon: Send },
  { href: "/admin", title: "Admin", icon: Shield },
  
];

export const additionalLinks: AdditionalLinks[] = [];
