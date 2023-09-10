'use client';

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation";

interface SidebarNavProps {
    items: {
        title: string,
        href: string,
        icon: JSX.Element
    }[]
}

export default function SidebarNav({ items }: SidebarNavProps) {
    const pathname = usePathname();

    return (
        <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        pathname === item.href
                            ? "bg-muted hover:bg-muted"
                            : "hover:bg-transparent hover:underline",
                        "justify-start"
                    )}
                >
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                </Link>
            ))}
        </nav>
    )
}