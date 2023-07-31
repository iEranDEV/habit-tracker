import { motion } from "framer-motion"
import ReactDOM from "react-dom"

type ModalProps = {
    children: JSX.Element
}

export default function Modal({ children }: ModalProps) {

    return (
        ReactDOM.createPortal( <div className="backdrop-blur-[2px] flex justify-center items-center bg-neutral-300/50 fixed top-0 left-0 z-50 w-full h-full">
            <motion.div initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-neutral-50 w-[500px] rounded-lg">
                {children}
            </motion.div>
        </div>, document.body)
    )
}