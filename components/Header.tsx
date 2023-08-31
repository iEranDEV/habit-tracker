import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Button } from "./ui/button";
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
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant={"outline"} size="icon">
                                    <Settings2 size={20} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Settings</p>
                            </TooltipContent>
                        </Tooltip>
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