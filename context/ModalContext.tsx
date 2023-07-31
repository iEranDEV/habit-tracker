import { createContext, useState } from "react"

export const ModalContext = createContext({
    modal: '',
    setModal: (modal: string) => {}
});

export default function ModalContextProvider({ children }: { children: JSX.Element }) {

    const [modal, setModal] = useState<string>('');

    return (
        <ModalContext.Provider value={{modal, setModal}}>
            {children}
        </ModalContext.Provider>
    )
}