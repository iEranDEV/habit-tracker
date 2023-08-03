'use client';

import { Check, EyeOff, KeyRound, Mail, Plus } from 'lucide-react';
import Image from 'next/image'

export default function LoginPage() {

    return (
        <div className="w-full h-[100dvh] bg-neutral-50 flex justify-center items-cente text-neutral-700">

            <div className="w-96 h-full justify-center items-center flex flex-col gap-8">
                {/* Header */}
                <p className="font-borel text-3xl">Welcome back</p>

                {/* Social login */}
                <div className="grid grid-cols-2 gap-2 w-full">

                    {/* Google */}
                    <div className="bg-neutral-50 hover:brightness-95 cursor-pointer transition-all rounded-lg border border-neutral-200 flex py-2 justify-center gap-4 items-center h-full w-full">
                        <Image src={'/google.webp'} height={15} width={15} alt={'Google logo'} />
                        <p className='font-semibold'>Google</p>
                    </div>

                    {/* Facebook */}
                    <div className="bg-neutral-50 hover:brightness-95 cursor-pointer transition-all rounded-lg border border-neutral-200 flex justify-center gap-4 items-center h-full w-full">
                        <Image src={'/facebook.png'} height={15} width={15} alt={'Facebook logo'} />
                        <p className='font-semibold'>Facebook</p>
                    </div>

                </div>

                {/* Divider */}
                <div className="w-full relative h-[1px] bg-neutral-200">
                    <div className="absolute top-1/2 px-4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-50">
                        <span className="text-neutral-400 text-xs">or continue with email</span>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={(e) => e.preventDefault()} className='flex flex-col justify-center items-center w-full gap-4'>

                    {/* Email input */}
                    <div className='group w-full p-2 rounded-lg border border-neutral-200 flex items-center'>
                        <div className='border-r pr-2 border-neutral-200 text-neutral-400'>
                            <Mail size={20} />
                        </div>
                        <input type="text" className='h-8 bg-neutral-50 grow palceholder-neutral-200 ml-2' placeholder='Email' />
                    </div>

                    {/* Password input */}
                    <div className='w-full p-2 rounded-lg border border-neutral-200 flex items-center'>
                        <div className='border-r pr-2 border-neutral-200 text-neutral-400'>
                            <KeyRound size={20} />
                        </div>
                        <input type="text" className='h-8 bg-neutral-50 grow palceholder-neutral-200 mx-2' placeholder='Password' />
                        <div className='text-neutral-400'>
                            <EyeOff size={20} />
                        </div>  
                    </div>

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
                    <div className="flex cursor-pointer hover:brightness-95 transition-all justify-center w-full text-neutral-50 items-center px-4 py-2 bg-purple-400 rounded-lg">
                        Log in
                    </div>

                </form>

                {/* Register link */}
                <div className='flex gap-2 items-center'>
                    <span className='text-neutral-400 text-sm'>Don't have an account?</span>
                    <p className='text-purple-400 text-sm font-semibold'>Create an account</p>
                </div>
            </div>
        </div>
    )
}