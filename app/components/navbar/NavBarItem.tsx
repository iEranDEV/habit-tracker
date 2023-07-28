import { motion } from "framer-motion";
import { useEffect, useState } from "react"

type NavBarItemProps = {
    icon: JSX.Element,
    tooltip: string
}

export default function NavBarItem({ icon, tooltip }: NavBarItemProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <div 
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex relative cursor-pointer gap-2 w-10 h-10 p-2 justify-center hover:bg-gray-600 items-center rounded-xl"
        >
            {icon}

            {/* Tooltip */}
            {hovered && (
                <motion.div 
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.5, duration: 0.2}}
                    className="hidden absolute w-max h-7 md:flex text-sm bg-gray-700/75 justify-center items-center rounded-lg text-light-50 px-4 py-2 left-16 top-1/2 -translate-y-1/2"
                >
                    <div className="absolute h-0 w-0 left-0 -translate-x-full border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-gray-700/75">
                        
                    </div>
                    <span>{tooltip}</span>
                </motion.div>
            )}
        </div>
    )
}