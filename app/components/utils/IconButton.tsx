type IconButtonProps = {
    icon: JSX.Element,
    onClick?: Function
}

export default function IconButton({ icon,onClick }: IconButtonProps) {

    return (
        <div onClick={() => onClick && onClick()} className="p-2 flex justify-center cursor-pointer text-neutral-400 transition-all bg-neutral-200 hover:bg-purple-100 hover:text-purple-400 items-center rounded-lg">
            {icon}
        </div>
    )
}