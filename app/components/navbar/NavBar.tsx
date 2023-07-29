import { BookOpen, CalendarDays, Goal, Smile, Sun, User } from "lucide-react";
import NavBarItem from "./NavBarItem";
import { useState } from "react";
import { motion } from "framer-motion";

export default function NavBar() {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.nav
            onMouseOver={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            initial={{ width: 72 }}
            animate={{ width: expanded ? 240 : 72 }}
            className='group h-full border-r border-neutral-200 gap-2 flex flex-col justify-center p-3'
        >
            <NavBarItem expanded={expanded} path="/" icon={<Sun />} tooltip="Home page" />
            <NavBarItem expanded={expanded} path="/habits" icon={<CalendarDays />} tooltip="Habits & tasks" />
            <NavBarItem expanded={expanded} path="/goals" icon={<Goal />} tooltip="Goals" />
            <NavBarItem expanded={expanded} path="/mood" icon={<Smile />} tooltip="Mood board" />
            <NavBarItem expanded={expanded} path="/journal" icon={<BookOpen />} tooltip="Your journal" />
            <NavBarItem expanded={expanded} path="/user" icon={<User />} tooltip="Account" />
        </motion.nav>
    )
}