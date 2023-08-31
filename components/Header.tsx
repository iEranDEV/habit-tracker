import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Button, buttonVariants } from "./ui/button";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
export default function Header() {

    const { user } = useContext(UserContext);

    const getWelcomeText = () => {
        const date = new Date();
        const hour = date.getHours();

        if (hour >= 5 && hour < 12) {
            return 'Good morning'
        } else if (hour >= 12 && hour < 18) {
            return 'Good afternoon'
        } else {
            return 'Good evening'
        }
    }

    return (
        <header className="pb-8 px-2 pt-6 relative w-full">
            <div className="h-full w-full flex justify-between items-center">
                <h1 className="select-none truncate text-header">
                    {getWelcomeText()}, {user.name}
                </h1>
                <div className="flex gap-2">
                    <TooltipProvider>

                        {/* Settings link */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link className={buttonVariants({ variant: "outline", size: "icon" })} href={"/settings"}>
                                    <Settings size={20} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Settings</p>
                            </TooltipContent>
                        </Tooltip>

                        {/* Log out */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant={"outline"} size="icon">
                                    <LogOut size={20} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Log out</p>
                            </TooltipContent>
                        </Tooltip>

                    </TooltipProvider>

                </div>
            </div>
        </header>
    )
}