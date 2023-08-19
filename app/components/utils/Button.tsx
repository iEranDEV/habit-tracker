
type ButtonProps = {
    name: string,
    onClick?: Function,
    submit?: boolean,
    icon: JSX.Element,
    secondary?: boolean
}

export default function Button({ name, onClick, submit, icon, secondary }: ButtonProps) {

    return (
        <button 
            onClick={(e) => onClick && onClick(e)}
            type={submit ? 'submit' : 'button'}
            className={`flex cursor-pointer hover:brightness-95 transition-all justify-center gap-2 ${secondary ? 'bg-neutral-200 text-neutral-500' : 'text-purple-500 bg-purple-200'} items-center px-4 py-2 rounded-lg`}
        >
            {icon}
            <div>{name}</div>
        </button>
    )
}