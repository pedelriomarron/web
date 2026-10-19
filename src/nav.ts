import { BriefcaseBusiness, Cog, FileUser, House, IdCard, MailOpen, type LucideIcon } from 'lucide-react';
import type { TextId } from './languages';

export interface NavItem {
    text: TextId
    url: string
    icon: LucideIcon
    color: string
}

// Same sections and colors as the 2020 sidebar
export const navItems: NavItem[] = [
    { text: "sidebar_home", url: "/", icon: House, color: "#f05252" },
    { text: "sidebar_portfolio", url: "/portfolio", icon: BriefcaseBusiness, color: "#8da2fb" },
    { text: "sidebar_resume", url: "/resume", icon: FileUser, color: "#c4a1ff" },
    { text: "sidebar_skills", url: "/skills", icon: Cog, color: "#76a9fa" },
    { text: "sidebar_about", url: "/about", icon: IdCard, color: "#5ee0a0" },
    { text: "sidebar_contact", url: "/contact", icon: MailOpen, color: "#fdba74" },
]

export const colorOf = (url: string) => navItems.find(item => item.url === url)!.color
