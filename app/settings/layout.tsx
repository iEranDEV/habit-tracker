import { Separator } from "@/components/ui/separator"
import { ChevronLeft, CopyCheck, List, Plus, Settings, Shapes, Star, User } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import SidebarNav from "@/components/layout/settings/nav/SidebarNav"
import { NavItem } from "@/types"
import { ProtectedRoute } from "@/context/UserContext"



const sidebarNavItems: NavItem[] = [
    {
        title: "Back to home page",
        href: "/",
        icon: <ChevronLeft size={20} />
    },
    {
        title: "General",
        href: "/settings",
        icon: <Settings size={20} />
    },
    {
        title: 'Habits',
        href: '/settings/habits',
        icon: <CopyCheck size={20} />,
    },
    {
        title: "Categories",
        href: "/settings/categories",
        icon: <Shapes size={20} />,
    },
]

export default function SettingsLayout({ children }: { children: JSX.Element }) {

    return (
        <ProtectedRoute>
            <div className="space-y-6 pb-16 rleative">
                <div className="space-y-6 sticky bg-background top-0 pt-4 md:pt-10 px-4 md:px-10">
                    <div className="flex justify-between">
                        <div className="space-y-0.5 grow-0">
                            <h1 className="text-4xl font-handwrite">Settings</h1>
                            <p className="text-muted-foreground text-sm">
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
        </ProtectedRoute>
    )
}