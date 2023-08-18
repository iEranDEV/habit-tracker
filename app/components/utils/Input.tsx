import { AlertCircle, } from "lucide-react";
import { RegisterOptions, useFormContext } from "react-hook-form";

type InputProps = {
    icon: JSX.Element,
    id: string,
    label: string,
    placeholder: string,
    type?: string,
    validate?: RegisterOptions
}

export default function Input({ icon, id, label, placeholder, type = 'text', validate = {} }: InputProps) {
    const methods = useFormContext();

    const error = methods.formState.errors[id];

    return (
        <div className="flex flex-col gap-1 max-w-md">
            <p className="text-neutral-400 font-semibold text-sm">
                {label}
            </p>
            <div className='w-full p-1 relative rounded-lg border gap-1 border-neutral-200 flex items-center'>

                {/* Icon */}
                <div className={`border-r px-2 border-neutral-200 ${error ? 'text-red-400' : 'text-neutral-400'}`}>
                    {icon}
                </div>

                {/* Input */}
                <input 
                    {...methods.register(id, validate)}
                    type={type} 
                    className='h-8 bg-neutral-50 grow palceholder-neutral-200 ml-2 focus:outline-none' 
                    placeholder={placeholder}
                />

                {error && (
                    <div className="absolute -top-[16px] -left-[10px] flex items-center gap-2 bg-neutral-50 p-1 text-red-400">
                        <AlertCircle size={16} />
                        <p className="text-sm">{error.message as string}</p>
                    </div>
                )}
            </div>
        </div>
    )
}