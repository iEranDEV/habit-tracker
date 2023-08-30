'use client';

import { getRedirect, signInGoogle } from '@/firebase/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {

    const router = useRouter();
    const form = useForm();

    useEffect(() => {
        const socialLoginHandle = async () => {
            const result = await getRedirect();

            if(result && 'success' in result && result.success) {
                return router.push('/');
            }
        }

        socialLoginHandle();
    }, []);

    function onSubmit(values: any) {
        console.log(values)
    }

    return (
        <div className="w-full py-20 flex justify-center items-cente">

            <div className="w-full px-4 md:px-0 md:w-96 h-full justify-center items-center flex flex-col gap-8">

                {/* Header */}
                <p className="font-handwrite text-3xl text-foreground">Create an account</p>

                {/* Social login */}
                <div className="grid grid-cols-2 gap-2 w-full">

                    {/* Google */}
                    <Button variant={'outline'} onClick={() => signInGoogle()}>
                        <Image src={'/google.webp'} className='mr-2' height={20} width={20} alt={'Google logo'} />
                        Google
                    </Button>

                    {/* Facebook */}
                    <Button variant={'outline'}>
                        <Image src={'/facebook.png'}className='mr-2' height={20} width={20} alt={'Google logo'} />
                        Facebook
                    </Button>

                </div>

                {/* Divider */}
                <div className="w-full relative h-[1px] bg-border">
                    <div className="absolute top-1/2 px-4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
                        <span className="text-border text-xs">or continue with email</span>
                    </div>
                </div>

                {/* Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

                        {/* Username input field */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. example@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password input field */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder="*************" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit button */}
                        <Button type="submit" className='w-full'>Sign in with Email</Button>
                    </form>
                </Form>

                {/* Register link */}
                <div className='flex gap-2 items-center'>
                    <span className='text-sm'>Already have an account?</span>
                    <Link href='/auth/login'>
                        <p className='text-primary text-sm font-semibold'>Log in</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}