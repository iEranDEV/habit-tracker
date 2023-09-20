import { NavItem } from "@/types";
import { SidebarNavItem } from "./SidebarNavItem";

interface SidebarNavProps {
    items: NavItem[]
}

export default function SidebarNav({ items }: SidebarNavProps) {

    return (
        <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {items.map((item) => (
                <SidebarNavItem key={item.title} item={item} />
            ))}
        </nav>
    )
}