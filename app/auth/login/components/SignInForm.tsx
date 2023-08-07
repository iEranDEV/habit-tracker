'use client';

import { useForm, FormProvider } from "react-hook-form";
import AuthFormInput from "../../components/AuthFormInput";
import { Check, KeyRound, Mail } from "lucide-react";

export default function SignInForm() {
    const methods = useForm();

    const onSubmit = (data: any) => console.log(data);

    return (
        <FormProvider {...methods}>
            <form noValidate onSubmit={methods.handleSubmit(onSubmit)} className='flex flex-col justify-center items-center w-full gap-6'>
                
                <AuthFormInput 
                    validate={{ required: 'This field is required', validate: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Email address must be a valid address" }} 
                    id='email' 
                    icon={<Mail size={20} />} 
                    name='Email' 
                    typeProp='email'
                />

                <AuthFormInput 
                    validate={{ required: 'This field is required' }} 
                    id='password' 
                    icon={<KeyRound size={20} />} 
                    name='Password' 
                    typeProp='password' 
                    password
                />

                {/* Additional options */}
                <div className='flex justify-between items-center w-full'>

                    {/* Remember me */}
                    <div className='flex items-center gap-2'>
                        <div className='h-4 w-4 flex justify-center items-center rounded-[5px] bg-purple-400 text-neutral-50'>
                            <Check size={14} strokeWidth={3} />
                        </div>
                        <p className='text-neutral-400 text-sm'>Remember me?</p>
                    </div>

                    {/* Forgot passowrd */}
                    <a href="#" className='text-purple-400 text-sm font-semibold'>Forgot password?</a>
                </div>

                {/* Submit button */}
                <button type='submit' className="flex cursor-pointer hover:brightness-95 transition-all justify-center w-full text-neutral-50 items-center px-4 py-2 bg-purple-400 rounded-lg">
                    Sign up
                </button>

            </form>
        </FormProvider>
    )
}