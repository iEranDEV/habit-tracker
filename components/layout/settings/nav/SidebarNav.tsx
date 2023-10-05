'use client';

import { NavItem } from "@/types";
import { SidebarNavItem } from "./SidebarNavItem";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface SidebarNavProps {
    items: NavItem[]
}

export default function SidebarNav({ items }: SidebarNavProps) {

    const [expanded, setExpanded] = useState(false);

    return (
        <nav className="overflow-hidden">
            <Button variant={'outline'} size={'icon'} className="fixed md:hidden top-4 right-4 z-[51]" onClick={() => setExpanded(!expanded)}>
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
                <div className="bg-background/80 md:hidden backdrop-blur-sm fixed left-0 top-0 w-screen h-screen z-10"></div>
            )}
        </nav>
    )
}