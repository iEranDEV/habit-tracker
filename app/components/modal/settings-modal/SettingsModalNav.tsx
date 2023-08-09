import { Folder, LogOut, User2 } from "lucide-react";
import SettingsModalNavItem from "./SettingsModalNavItem";
import { getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";

type SettingsModalNavProps = {
    currentTab: string,
    setCurrentTab: Function
}

export default function SettingsModalNav({ currentTab, setCurrentTab }: SettingsModalNavProps) {

    const tabs = [
        {
            id: 'categories',
            name: 'Categories',
            icon: <Folder size={16} />
        }, {
            id: 'account',
            name: 'Account',
            icon: <User2 size={16} />
        }
    ]

    return (
        <div className="basis-1/4 border-r pr-2 border-neutral-200 flex flex-col gap-2">
            {tabs.map((item) => (
                <SettingsModalNavItem key={item.id} icon={item.icon} id={item.id} name={item.name} selected={currentTab === item.id} setCurrentTab={setCurrentTab} />
            ))}
            <div
                onClick={() => getAuth(firebase_app).signOut()} 
                className={`bg-neutral-50 w-full py-2 px-4 text-red-400 cursor-pointer flex items-center gap-2 rounded-lg  hover:brightness-95`}
            >
                <LogOut size={16} />
                <span>Log out</span>
            </div>
        </div>
    )
}