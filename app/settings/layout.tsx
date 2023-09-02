import { Separator } from "@/components/ui/separator"
import SidebarNav from "../../components/SidebarNav"
import { ChevronLeft, Home, Shapes, Star, User } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"

const sidebarNavItems = [
    {
        title: "Back to home page",
        href: "/",
        icon: <ChevronLeft strokeWidth={1.5} size={20} />
    },
    {
        title: "Account",
        href: "/settings",
        icon: <User strokeWidth={1.5} size={20} />
    },
    {
        title: "Categories",
        href: "/settings/categories",
        icon: <Shapes strokeWidth={1.5} size={20} />
    },
    {
        title: "Premium",
        href: "/settings/premium",
        icon: <Star strokeWidth={1.5} size={20} />
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