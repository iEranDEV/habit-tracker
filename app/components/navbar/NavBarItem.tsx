import { motion } from "framer-motion";
import { useState } from "react"
import { usePathname } from 'next/navigation';
import Link from "next/link";

type NavBarItemProps = {
    icon: JSX.Element,
    tooltip: string,
    path: string,
    expanded: boolean
}

export default function NavBarItem({ icon, tooltip, path, expanded }: NavBarItemProps) {
    const [hovered, setHovered] = useState(false);

    const selected = usePathname() === path;

    return (
        <Link
            href={path} 
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`flex gap-2 relative cursor-pointer ${selected ? 'text-blue-500' : 'text-neutral-600'} bg-neutral-50 w-full h-10 p-3 hover:brightness-95 items-center rounded-xl`}
        >
            <div className="h-6 w-6">
                {icon}
            </div>
            <motion.div initial={{ width: 0}} animate={{ width: expanded ? '100%' : 0}} className={`flex text-sm h-6 items-center overflow-hidden whitespace-nowrap`}>
                {tooltip}
            </motion.div>
            {selected && (
                <motion.div layoutId="selectedItem" className="hidden md:block absolute -right-[14px] h-3/4 rounded-full w-1 !brightness-100 bg-blue-500">
                    
                </motion.div>
            )}
        </Link>
    )
}