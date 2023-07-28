import { BookOpen, CalendarDays, Goal, Smile, User } from "lucide-react";
import NavBarItem from "./NavBarItem";

export default function NavBar() {

    return (
        <nav className='basis-16 mb-2 md:ml-2 h-auto bg-gray-500 rounded-xl gap-2 flex flex-row md:flex-col text-light-50 justify-center items-center p-2'>
            <NavBarItem icon={<CalendarDays />} tooltip="Habits & tasks" />
            <NavBarItem icon={<Goal />} tooltip="Goals" />
            <NavBarItem icon={<Smile />} tooltip="Mood board" />
            <NavBarItem icon={<BookOpen />} tooltip="Your journal" />
            <NavBarItem icon={<User />} tooltip="Account" />
        </nav>
    )
}