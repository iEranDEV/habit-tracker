import { Settings2 } from "lucide-react";
import IconButton from "./IconButton";
import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { UserContext } from "@/context/UserContext";

export default function Header() {

    const modalContext = useContext(ModalContext);
    const { user } = useContext(UserContext);

    return (
        <header className="pb-8 pt-6 relative">
            <div className="h-full w-full flex justify-between items-center">
                <p className="select-none font-borel text-neutral-700 text-3xl">Good morning, {user.name}</p>
                <IconButton onClick={() => modalContext.setModal('settings')} icon={<Settings2 />} />
            </div>
        </header>
    )
}