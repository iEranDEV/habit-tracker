'use client';

import Image from 'next/image'
import Link from 'next/link';
import SignUpForm from './components/SignUpForm';

export default function SignupPage() {

    return (
        <div className="w-full h-[100dvh] bg-neutral-50 flex justify-center items-cente text-neutral-700">

            <div className="w-full px-4 md:px-0 md:w-96 h-full justify-center items-center flex flex-col gap-8">

                {/* Header */}
                <p className="font-borel text-3xl">Create an account</p>

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
                <SignUpForm />

                {/* Register link */}
                <div className='flex gap-2 items-center'>
                    <span className='text-neutral-400 text-sm'>Already have an account?</span>
                    <Link href='/auth/login'>
                        <p className='text-purple-400 text-sm font-semibold'>Log in</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}