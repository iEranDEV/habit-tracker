import { Leaf, Lock } from "lucide-react";

export default function HabitListItem() {

    return (
        <div className="w-full flex items-center">
            <div className="basis-1/4 flex justify-start items-center truncate gap-2">
                <div className="p-2 rounded-lg bg-green-100 text-green-500">
                    <Leaf size={16} />
                </div>
                <p className="text-neutral-600">Water the plants</p>
            </div>
            <div className="grow flex px-4 justify-between items-center">
                <div className="h-12 w-12 flex justify-center items-center">
                    <div className="w-8 h-8 bg-neutral-200 rounded-lg"></div>
                </div>
                <div className="h-12 w-12 flex justify-center items-center text-neutral-400">
                <div className="w-8 h-8 bg-neutral-300 rounded-lg flex justify-center items-center"><Lock size={16} /></div>
                </div>
                <div className="h-12 w-12 flex justify-center items-center text-neutral-400">
                    <div className="w-8 h-8 bg-neutral-300 rounded-lg flex justify-center items-center"><Lock size={16} /></div>
                </div>
                <div className="h-12 w-12 flex justify-center items-center text-neutral-400">
                    <div className="w-8 h-8 bg-neutral-300 rounded-lg flex justify-center items-center"><Lock size={16} /></div>
                </div>
                <div className="h-12 w-12 flex justify-center items-center text-neutral-400">
                    <div className="w-8 h-8 bg-neutral-300 rounded-lg flex justify-center items-center"><Lock size={16} /></div>
                </div>
                <div className="h-12 w-12 flex justify-center items-center text-neutral-400">
                    <div className="w-8 h-8 bg-neutral-300 rounded-lg flex justify-center items-center"><Lock size={16} /></div>
                </div>
                <div className="h-12 w-12 flex justify-center items-center text-neutral-400">
                    <div className="w-8 h-8 bg-neutral-300 rounded-lg flex justify-center items-center"><Lock size={16} /></div>
                </div>
            </div>
            <div className="basis-20"></div>
        </div>
    )
}