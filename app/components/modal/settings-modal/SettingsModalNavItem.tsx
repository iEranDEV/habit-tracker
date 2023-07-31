type SettingsModalNavItemProps = {
    icon: JSX.Element,
    id: string,
    name: string,
    selected: boolean,
    setCurrentTab: Function
}

export default function SettingsModalNavItem({ icon, id, name, selected, setCurrentTab }: SettingsModalNavItemProps) {

    return (
        <div
            onClick={() => setCurrentTab(id)} 
            className={`${selected ? 'text-purple-400 bg-purple-100' : 'bg-neutral-50'} w-full px-2 py-1 cursor-pointer flex items-center gap-2 rounded-lg  hover:brightness-95`}
        >
            {icon}
            <span>{name}</span>
        </div>
    )
}