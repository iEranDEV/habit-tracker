'use client';

import { NavItem } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarNavProps {
    items: NavItem[]
}

export default function SidebarNav({ items }: SidebarNavProps) {

    const [expanded, setExpanded] = useState(false);

    return (
        <nav className="overflow-hidden">
            <Button variant={'outline'} size={'icon'} className="fixed md:hidden top-4 right-4 z-50" onClick={() => setExpanded(!expanded)}>
                {expanded ? (
                    <X size={20} />
                ) : (
                    <Menu size={20} />
                )}
            </Button>

            {/* Desktop navbar */}
            <div className="flex max-md:hidden flex-col space-y-1 bg-background">
                {items.map((item) => (
                    <SidebarNavItem key={item.title} item={item} />
                ))}
            </div>

            {/* Mobile navbar */}
            <motion.div
                initial={{ y: '-100%' }}
                animate={{ y: expanded ? '0' : '-100%' }}
                className={`flex md:hidden absolute top-0 flex-col w-full z-20 pt-28 pb-10 space-y-1 bg-background max-md:border-b`}
            >
                {items.map((item) => (
                    <SidebarNavItem key={item.title} item={item} />
                ))}
            </motion.div>

            {expanded && (
                <div className="bg-background/80 md:hidden backdrop-blur-sm fixed left-0 top-0 w-[100lvw] h-[100lvh] z-10"></div>
            )}
        </nav>
    )
}

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