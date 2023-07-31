import { ModalContext } from "@/context/ModalContext"
import { motion } from "framer-motion"
import { useContext } from "react"
import IconButton from "../utils/IconButton"
import { X } from "lucide-react"

type ModalProps = {
    children: JSX.Element,
    title: string,
    headerButtons?: JSX.Element
}

export default function Modal({ children, title, headerButtons }: ModalProps) {

    const modalContext = useContext(ModalContext);

    return (
        <div
            onClick={() => modalContext.setModal('')}
            className="backdrop-blur-[2px] flex justify-center items-center bg-neutral-300/50 fixed top-0 left-0 z-50 w-full h-full"
        >            
            <motion.div 
                onClick={(e) => e.stopPropagation()} 
                initial={{ x: -300, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                exit={{ x: -300, opacity: 0 }}
                className="bg-neutral-50 flex flex-col p-2 w-[500px] rounded-lg"
            >
                
                {/* Modal header */}
                <div className="w-full border-b border-neutral-200 flex justify-between items-center p-2">

                    {/* Modal title */}
                    <p className="font-semibold text-lg">{title}</p>

                    {/* Buttons */}
                    {headerButtons ? headerButtons : (
                        <IconButton onClick={() => modalContext.setModal('')} icon={<X />} />
                    )}
                </div>

                {/* Modal body */}
                <div className="p-2">
                    {children}
                </div>

                {/* Modal footer */}


            </motion.div>
        </div>
    )
}