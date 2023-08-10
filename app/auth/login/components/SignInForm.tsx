import { useForm, FormProvider } from "react-hook-form";
import AuthFormInput from "../../components/AuthFormInput";
import { Check, KeyRound, Loader2, Mail, X } from "lucide-react";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { signIn } from "@/firebase/auth";
import { useRouter } from "next/navigation";

export default function SignInForm() {
    const methods = useForm();
    const router = useRouter();

    const [formError, setFormError] = useState<FirebaseError | null>(null);
    const [loading, setLoading] = useState(false);


    const onSubmit = async (data: any) => {
        setLoading(true);
        const { result, error } = await signIn(data.email, data.password);
        setLoading(false);

        if(error) {
            return setFormError(error);
        }

        return router.push('/');
    };

    return (
        <FormProvider {...methods}>
            <form noValidate onSubmit={methods.handleSubmit(onSubmit)} className='flex flex-col justify-center items-center w-full gap-6'>

                {formError && (
                    <div className="border border-red-400 text-sm text-red-500 bg-red-100 w-full p-2 rounded-lg relative">
                        {formError?.message}

                        <div onClick={() => setFormError(null)} className="absolute flex justify-center items-center cursor-pointer right-0 top-0 translate-x-1/3 -translate-y-1/3 w-5 h-5 bg-red-400 rounded-lg text-neutral-50">
                            <X size={16} />
                        </div>
                    </div>
                )}
                
                <AuthFormInput 
                    validate={{ 
                        required: 'This field is required', 
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
                    {loading ? (
                        <span className="animate-spin"><Loader2 size={20} /></span>
                    ) : (
                        <span>Sign in</span>
                    )}
                </button>

            </form>
        </FormProvider>
    )
}