import { Settings2 } from "lucide-react";
import IconButton from "./IconButton";
import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { UserContext } from "@/context/UserContext";

export default function Header() {

    const modalContext = useContext(ModalContext);
    const { user } = useContext(UserContext);

    const getWelcomeText = () => {
        const date = new Date();
        const hour = date.getHours();
    
        if(hour >= 5 && hour < 12) {
            return 'Good morning'
        } else if(hour >= 12 && hour < 18) {
            return 'Good afternoon'
        } else {
            return 'Good evening'
        }
    }

    return (
        <header className="pb-8 pt-6 relative">
            <div className="h-full w-full flex justify-between items-center">
                <p className="select-none font-borel text-neutral-700 text-3xl">{getWelcomeText()}, {user.name}</p>
                <IconButton onClick={() => modalContext.setModal('settings')} icon={<Settings2 />} />
            </div>
        </header>
    )
}