import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { UserContext } from "@/context/UserContext";
import SettingsModal from "./modal/SettingsModal";

export default function Header() {

    const modalContext = useContext(ModalContext);
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
                <h1 className="select-none truncate">
                    {getWelcomeText()}, {user.name}
                </h1>
                <SettingsModal />
            </div>
        </header>
    )
}