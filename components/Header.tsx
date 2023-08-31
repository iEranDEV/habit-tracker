import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Button, buttonVariants } from "./ui/button";
import { LogOut, Settings2 } from "lucide-react";
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
                <div className="space-x-2">
                    <TooltipProvider>

                        {/* Settings link */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link className={buttonVariants({ variant: "outline", size: "icon" })} href={"/settings"}>
                                    <Settings2 size={20} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Settings</p>
                            </TooltipContent>
                        </Tooltip>

                        {/* Log out */}
                        <Button variant={"outline"} size="icon" tooltip="Log out">
                            <LogOut size={20} />
                        </Button>

                    </TooltipProvider>
                </div>
            </div>
        </header>
    )
}