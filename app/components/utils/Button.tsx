
type ButtonProps = {
    name: string,
    onClick?: Function,
    submit?: boolean,
    icon: JSX.Element
}

export default function Button({ name, onClick, submit, icon }: ButtonProps) {

    return (
        <button 
            onClick={() => onClick && onClick()}
            type={submit ? 'submit' : 'button'}
            className="flex cursor-pointer hover:brightness-95 transition-all justify-center gap-2 text-purple-500 items-center px-4 py-2 bg-purple-200 rounded-lg"
        >
            {icon}
            <div>{name}</div>
        </button>
    )
}