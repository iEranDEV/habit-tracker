import { useForm, FormProvider } from "react-hook-form";
import AuthFormInput from "../../components/AuthFormInput";
import { KeyRound, Mail, User } from "lucide-react";

export default function SignUpForm() {
    const methods = useForm();

    const onSubmit = (data: any) => console.log(data);

    return (
        <FormProvider {...methods}>
            <form noValidate onSubmit={methods.handleSubmit(onSubmit)} className='flex flex-col justify-center items-center w-full gap-6'>

                <AuthFormInput id='name' icon={<User size={20} />} name={'Name'}  />

                <AuthFormInput id='email' icon={<Mail size={20} />} name='Email' typeProp='email' />

                <AuthFormInput id='email_confirmation' icon={<Mail size={20} />} name='Confirm email' typeProp='email' />

                <AuthFormInput id='password' icon={<KeyRound size={20} />} name='Password' typeProp='password' password />

                <AuthFormInput id='password_confirmation' icon={<KeyRound size={20} />} name='Confirm password' typeProp='password' password />

                <p className='text-neutral-400 text-sm'>
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