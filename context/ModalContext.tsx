import SettingsModal from "@/app/components/modal/settings-modal/SettingsModal";
import TestModal from "@/app/components/modal/TestModal";
import NewHabitModal from "@/app/components/modal/new-habit/NewHabitModal";
import { AnimatePresence } from "framer-motion";
import { createContext, useState } from "react"

export const ModalContext = createContext({
    modal: '',
    setModal: (modal: string) => {}
});

export default function ModalContextProvider({ children }: { children: React.ReactNode }) {

    const [modal, setModal] = useState<string>('');

    return (
        <ModalContext.Provider value={{modal, setModal}}>
            <AnimatePresence>
                {
                    {
                        'test': <TestModal />,
                        'settings': <SettingsModal />,
                        'new_habit': <NewHabitModal />
                    }[modal]
                }
            </AnimatePresence>
            {children}
        </ModalContext.Provider>
    )
}