'use client';

import { useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod';
import { signIn, useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';


export default function LoginPage() {

    // Form schema
    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().trim().min(1, { message: 'This field is required' }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            // User is logged in (push to /)
            router.push('/')
        }
    }, [session, router]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const result = await signIn('credentials', {
            ...values,
            redirect: false
        });
        router.push('/');
    }

    return (
        <div className="w-full py-20 flex justify-center items-cente">

            <div className="w-full px-4 md:px-0 md:w-96 h-full justify-center items-center flex flex-col space-y-8">

                {/* Header */}
                <h1 className='text-header'>Welcome back</h1>

                {/* Social login */}
                <div className="grid grid-cols-2 gap-2 w-full">

                    {/* Google */}
                    <Button variant={'outline'} onClick={() => signIn('google')}>
                        <Image src={'/google.webp'} className='mr-2' height={20} width={20} alt={'Google logo'} />
                        Google
                    </Button>

                    {/* Facebook */}
                    <Button variant={'outline'} disabled>
                        <Image src={'/facebook.png'} className='mr-2' height={20} width={20} alt={'Google logo'} />
                        Facebook
                    </Button>

                </div>

                {/* Divider */}
                <div className="w-full relative h-[1px] bg-border">
                    <div className="absolute top-1/2 px-4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
                        <span className="text-xs text-muted-foreground">or continue with email</span>
                    </div>
                </div>

                {/* Form */}
                <Form {...form}>
                    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail address</FormLabel>
                                    <FormControl>
                                        <Input type='email' placeholder="e.g. example@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                    <span className='text-sm text-muted-foreground'>Don&apos;t have an account?</span>
                    <Link href='/auth/signup'>
                        <p className='text-primary text-sm font-semibold'>Create one</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}