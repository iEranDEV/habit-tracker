import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

type AuthFormInputProps = {
    icon: JSX.Element,
    id: string,
    name: string,
    typeProp?: string,
    password?: boolean,
    validate: RegisterOptions
}

export default function AuthFormBInput({ icon, id, name, typeProp = 'text', password = false, validate }: AuthFormInputProps) {
    const [type, setType] = useState(typeProp);
    const methods = useFormContext();

    const error = methods.formState.errors[id];

    return (
        <div className='w-full p-2 relative rounded-lg border gap-1 border-neutral-200 flex items-center'>

            {/* Icon */}
            <div className={`border-r px-2 border-neutral-200 ${error ? 'text-red-400' : 'text-neutral-400'}`}>
                {icon}
            </div>

            {/* Input */}
            <input 
                {...methods.register(id, validate)}
                type={type} 
                className='h-8 bg-neutral-50 grow palceholder-neutral-200 ml-2 focus:outline-none' 
                placeholder={name}
            />

            {/* Password hide/show button */}
            {password && (
                <div onClick={() => setType(type === 'text' ? 'password' : 'text')} className='select-none cursor-pointer text-neutral-400'>
                    {type === 'password' ? (
                        <EyeOff size={20} />
                    ) : (
                        <Eye size={20} />
                    )}
                </div>  
            )}

            {error && (
                <div className="absolute -top-[16px] -left-[10px] flex items-center gap-2 bg-neutral-50 p-1 text-red-400">
                    <AlertCircle size={16} />
                    <p className="text-sm">{error.message as string}</p>
                </div>
            )}
        </div>
    )
}