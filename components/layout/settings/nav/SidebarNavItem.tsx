import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types"
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarNavItemProps = {
    item: NavItem,
    child?: boolean
}

export function SidebarNavItem({ item, child }: SidebarNavItemProps) {
    const pathname = usePathname();

    const className = cn(
        buttonVariants({ variant: "ghost" }),
        `${child && '!ml-6'} flex justify-between items-center cursor-pointer select-none`
    )

    return (
        <div className="relative">
            <Link
                href={item.href}
                className={className}
            >
                <div className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                </div>
            </Link>

            {(item.href === pathname) && (
                <motion.div layout layoutId="navBar" className="max-md:hidden absolute -right-1 top-2 rounded-full bg-primary h-6 w-2"></motion.div>
            )}
        </div>
    )
}