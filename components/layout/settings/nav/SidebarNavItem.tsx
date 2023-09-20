'use client';

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types"
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type SidebarNavItemProps = {
    item: NavItem,
    child?: boolean
}

export function SidebarNavItem({ item, child }: SidebarNavItemProps) {
    const pathname = usePathname();
    const [expanded, setExpanded] = useState(false);

    const className = cn(
        buttonVariants({ variant: "ghost" }),
        `${child && '!ml-6'} flex justify-between items-center cursor-pointer select-none`
    )

    return (
        <div className="relative">
            {item.children ? (
                <div
                    className={className}
                    onClick={() => item.children && setExpanded(!expanded)}
                >
                    <div className="flex items-center">
                        {item.icon}
                        <span className="ml-2">{item.title}</span>
                    </div>
                    {item.children && (
                        <>
                            <ChevronUp size={20} className={`${expanded ? 'rotate-0' : 'rotate-180'} transition-all`} />
                        </>
                    )}
                </div>
            ) : (
                <Link
                    href={item.href}
                    className={className}
                >
                    <div className="flex items-center">
                        {item.icon}
                        <span className="ml-2">{item.title}</span>
                    </div>
                </Link>
            )}
            {(item.children && expanded) && (
                <>
                    {item.children.map((child) => (
                        <SidebarNavItem key={child.title} child item={child} />
                    ))}
                </>
            )}

            {(item.showCurrent && item.href === pathname) && (
                <motion.div layout layoutId="navBar" className="absolute -right-1 top-2 rounded-full bg-primary h-6 w-2"></motion.div>
            )}
        </div>
    )
}