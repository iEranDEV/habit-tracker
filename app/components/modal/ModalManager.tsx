import { ModalContext } from "@/context/ModalContext"
import { Fragment, useContext } from "react"
import TestModal from "./TestModal";
import SettingsModal from "./SettingsModal";

export default function ModalManager() {

    const modalContext = useContext(ModalContext);

    return (
        <Fragment>
            {
                {
                    'test': <TestModal />,
                    'settings': <SettingsModal />
                }[modalContext.modal]
            }
        </Fragment>
    )
}