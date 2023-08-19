import { AlertCircle, } from "lucide-react";
import { RegisterOptions, useFormContext } from "react-hook-form";

type InputProps = {
    id: string,
    label: string,
    placeholder: string,
    type?: string,
    validate?: RegisterOptions
}

export default function Input({ id, label, placeholder, type = 'text', validate = {} }: InputProps) {
    const methods = useFormContext();

    const error = methods.formState.errors[id];

    return (
        <div className="flex flex-col gap-1 max-w-md">
            <p className="text-neutral-700 font-semibold text-sm">
                {label}
            </p>
            <div className='w-full relative rounded-lg bg-neutral-50 flex items-center'>

                {/* Input */}
                <input 
                    {...methods.register(id, validate)}
                    type={type} 
                    className='h-full bg-neutral-50 rounded-lg border-neutral-200 border p-2 grow placeholder-neutral-300 focus:outline-purple-400' 
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