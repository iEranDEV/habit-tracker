import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";


type AuthFormInputProps = {
    icon: JSX.Element,
    id: string,
    name: string,
    typeProp?: string,
    password?: boolean
}

export default function AuthFormBInput({ icon, name, typeProp = 'text', password = false }: AuthFormInputProps) {
    const [type, setType] = useState(typeProp);

    return (
        <div className='group w-full p-2 rounded-lg border border-neutral-200 flex items-center'>
            <div className='border-r px-2 border-neutral-200 text-neutral-400'>
                {icon}
            </div>
            <input type={type} className='h-8 bg-neutral-50 grow palceholder-neutral-200 ml-2' placeholder={name} />
            {password && (
                <div onClick={() => setType(type === 'text' ? 'password' : 'text')} className='cursor-pointer text-neutral-400'>
                    {type === 'password' ? (
                        <EyeOff size={20} />
                    ) : (
                        <Eye size={20} />
                    )}
                </div>  
            )}
        </div>
    )
}