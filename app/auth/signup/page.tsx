'use client';

import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getRedirect, signInGoogle } from '@/firebase/auth';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

export default function SignupPage() {

    // Form schema
    const formSchema = z.object({
        name: z.string(),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string(),
        confirmPassword: z.string(),
    })

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    useEffect(() => {
        const socialLoginHandle = async () => {
            const result = await getRedirect();

            if (result && 'success' in result && result.success) {
                return router.push('/');
            }
        }

        socialLoginHandle();
    }, []);

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className="w-full py-20 flex justify-center items-center">

            <div className="w-full px-4 md:px-0 md:w-96 h-full justify-center items-center flex flex-col space-y-8">

                {/* Header */}
                <h1 className='text-header'>Create an account</h1>

                {/* Social login */}
                <div className="grid grid-cols-2 gap-2 w-full">

                    {/* Google */}
                    <Button
                        variant={'outline'}
                        onClick={() => signInGoogle()}
                    >
                        <Image
                            src={'/google.webp'}
                            className='mr-2'
                            height={20}
                            width={20}
                            alt={'Google logo'}
                        />
                        Google
                    </Button>

                    {/* Facebook */}
                    <Button variant={'outline'}>
                        <Image
                            src={'/facebook.png'}
                            className='mr-2'
                            height={20}
                            width={20}
                            alt={'Google logo'}
                        />
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
                    <form
                        noValidate
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 w-full"
                    >

                        {/* Name input field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type='text' placeholder="e.g. John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email input field */}
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

                        {/* Password confirm input field */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder="*************" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit button */}
                        <Button
                            type="submit"
                            className='w-full'
                        >
                            Sign up with Email
                        </Button>
                    </form>
                </Form>

                {/* Register link */}
                <div className='flex gap-2 items-center'>
                    <span className='text-muted-foreground text-sm'>
                        Already have an account?
                    </span>
                    <Link href='/auth/login'>
                        <p className='text-primary text-sm font-semibold'>
                            Sign in
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}