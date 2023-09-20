import { Separator } from "@/components/ui/separator"
import { ChevronLeft, CopyCheck, List, Plus, Settings, Shapes, Star, User } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import SidebarNav from "@/components/layout/settings/nav/SidebarNav"
import { NavItem } from "@/types"



const sidebarNavItems: NavItem[] = [
    {
        title: "Back to home page",
        href: "/",
        showCurrent: false,
        icon: <ChevronLeft size={20} />
    },
    {
        title: "General",
        href: "/settings",
        showCurrent: true,
        icon: <Settings size={20} />
    },
    {
        title: "Account",
        href: "/settings/account",
        showCurrent: true,
        icon: <User size={20} />
    },
    {
        title: 'Habits',
        href: '/settings/habits',
        showCurrent: false,
        icon: <CopyCheck size={20} />
    },
    {
        title: "Categories",
        href: "/settings/categories",
        showCurrent: false,
        icon: <Shapes size={20} />,
        children: [
            {
                title: "Categories list",
                href: "/settings/categories",
                showCurrent: true,
                icon: <List size={20} />
            },
            {
                title: "Create new category",
                href: "/settings/categories/new",
                showCurrent: true,
                icon: <Plus size={20} />
            }
        ]
    },
    {
        title: "Premium",
        href: "/settings/premium",
        showCurrent: true,
        icon: <Star size={20} />
    },
]

export default function SettingsLayout({ children }: { children: JSX.Element }) {

    return (
        <div className="space-y-6 pb-16 rleative">
            <div className="space-y-6 sticky bg-background top-0 pt-10 px-10">
                <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                        <h1 className="text-header">Settings</h1>
                        <p className="text-muted-foreground">
                            Manage your account settings and set e-mail preferences.
                        </p>
                    </div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link className={buttonVariants({ variant: "outline", size: "icon" })} href={"/"}>
                                    <ChevronLeft size={20} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Home page</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <Separator className="my-6" />
            </div>
            <div className="flex flex-col space-y-8 px-10 lg:flex-row lg:space-x-12 lg:space-y-0 static">
                <aside className="-mx-4 lg:w-1/5">
                    <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
        </div>
    )
}