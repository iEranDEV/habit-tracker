'use client';

import { useForm, FormProvider } from "react-hook-form";
import AuthFormInput from "../../components/AuthFormInput";
import { KeyRound, Mail, User } from "lucide-react";
import { signUp } from "@/firebase/auth";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
    const methods = useForm();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        const { result, error } = await signUp(data.email, data.password);

        if(error) {
            return console.log(error);
        }

        console.log(result);
        return router.push('/');
    };

    return (
        <FormProvider {...methods}>
            <form noValidate onSubmit={methods.handleSubmit(onSubmit)} className='flex flex-col justify-center items-center w-full gap-6'>

                <AuthFormInput 
                    validate={{ required: 'This field is required' }} 
                    id='name' 
                    icon={<User size={20} />} 
                    name={'Name'}
                />

                <AuthFormInput 
                    validate={{ 
                        required: 'This field is require.', 
                        pattern: {
                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Email address must be a valid address"
                        }
                    }}
                    id='email'
                    icon={<Mail size={20} />} 
                    name='Email'
                    typeProp='email'
                />

                <AuthFormInput
                    validate={{ 
                        required: 'This field is required', 
                        pattern: {
                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Email address must be a valid address"
                        },
                        validate: value => value === methods.getValues('email') || 'Emails do not match'
                    }}
                    id='email_confirmation'
                    icon={<Mail size={20} />}
                    name='Confirm email'
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

                <AuthFormInput
                    validate={{ required: 'This field is required', validate: value => value === methods.getValues('password') || 'Passwords do not match' }}
                    id='password_confirmation'
                    icon={<KeyRound size={20} />}
                    name='Confirm password'
                    typeProp='password'
                    password
                />

                <p className='text-neutral-400 text-xs'>
                    By signing up, you agree to our Terms. Learn how we collect, use and share your data in our Privacy Policy and how we use cookies and similar technology in our Cookies Policy.
                </p>

                {/* Submit button */}
                <button type='submit' className="flex cursor-pointer hover:brightness-95 transition-all justify-center w-full text-neutral-50 items-center px-4 py-2 bg-purple-400 rounded-lg">
                    Sign up
                </button>

            </form>
        </FormProvider>
    )
}