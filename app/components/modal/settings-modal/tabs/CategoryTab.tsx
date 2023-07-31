import { Bike, Briefcase, GraduationCap, HeartPulse, Home, Leaf, MessagesSquare, Ticket, Wallet } from "lucide-react";

export default function CategoryTab() {

    return (
        <div className="w-full h-full flex flex-col gap-2">

            <p className="text-neutral-400 text-sm">Built-in categories</p>

            <div className="w-full h-full grid grid-cols-3 gap-2">

                {/* Nature */}
                <div className="w-full flex gap-2 items-center">
                    <div className="p-2 h-8 w-8 rounded-lg bg-green-100 text-green-500">
                        <Leaf size={16} />
                    </div>
                    <p>Nature</p>
                </div>

                {/* Sport */}
                <div className="w-full flex gap-2 items-center">
                    <div className="p-2 h-8 w-8 rounded-lg bg-blue-100 text-blue-500">
                        <Bike size={16} />
                    </div>
                    <p>Sport</p>
                </div>

                {/* Home */}
                <div className="w-full flex gap-2 items-center">
                    <div className="p-2 h-8 w-8 rounded-lg bg-orange-100 text-orange-500">
                        <Home size={16} />
                    </div>
                    <p>Home</p>
                </div>

                {/* Study */}
                <div className="w-full flex gap-2 items-center">
                    <div className="p-2 h-8 w-8 rounded-lg bg-pink-100 text-pink-500">
                        <GraduationCap size={16} />
                    </div>
                    <p>Study</p>
                </div>

                {/* Finance */}
                <div className="w-full flex gap-2 items-center">
                    <div className="p-2 h-8 w-8 rounded-lg bg-emerald-100 text-emerald-500">
                        <Wallet size={16} />
                    </div>
                    <p>Finance</p>
                </div>

                {/* Work */}
                <div className="w-full flex gap-2 items-center">
                    <div className="p-2 h-8 w-8 rounded-lg bg-cyan-100 text-cyan-500">
                        <Briefcase size={16} />
                    </div>
                    <p>Work</p>
                </div>

                {/* Health */}
                <div className="w-full flex gap-2 items-center">
                    <div className="p-2 h-8 w-8 rounded-lg bg-red-100 text-red-500">
                        <HeartPulse size={16} />
                    </div>
                    <p>Health</p>
                </div>

                {/* Social */}
                <div className="w-full flex gap-2 items-center">
                    <div className="p-2 h-8 w-8 rounded-lg bg-amber-100 text-amber-500">
                        <MessagesSquare size={16} />
                    </div>
                    <p>Social</p>
                </div>

                {/* Entertainment */}
                <div className="w-full flex gap-2 items-center">
                    <div className="p-2 h-8 w-8 rounded-lg bg-indigo-100 text-indigo-500">
                        <Ticket size={16} />
                    </div>
                    <p>Entertainment</p>
                </div>

            </div>

            <hr />

            <p className="text-neutral-400 text-sm">Custom categories</p>
        </div>
    )
}