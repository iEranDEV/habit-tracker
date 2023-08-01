import IconButton from '@/app/components/utils/IconButton';
import { Loader2, MailQuestion, Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

export default function NewCategoryForm() {

    const [picker, setPicker] = useState(false);

    const IconPicker = dynamic(() => import('./IconPicker'), {
        loading: () => (
            <div className='h-full w-64 flex justify-center items-center'>
                <div className='text-neutral-500 animate-spin'>
                    <Loader2 />
                </div>
            </div>
        )
    });

    return (
        <>
            <form className="flex gap-2 items-center">
                <div className="rounded-lg flex divide-x divide-neutral-200 border border-neutral-200">
                    <div onClick={() => setPicker(!picker)} className="cursor-pointer h-8 w-8 flex justify-center items-center">
                        <MailQuestion size={16} />
                    </div>
                    
                    <input type="text" className="rounded-r-lg bg-neutral-50 px-2 placeholder-neutral-200" placeholder="Enter habit name" />
                </div>

                <IconButton icon={<Plus size={16} />} />
            </form>
            
            {picker && (
                <div className="bg-neutral-50 border rounded-lg border-neutral-200 shadow p-2 top-4 -translate-y-full left-0 gap-2 absolute w-72">
                    <div className="w-full h-12 flex gap-2 border-b border-neutral-200">
                        search bar  
                    </div>
                    <div className="grid grid-cols-7 gap-1 h-60 w-full overflow-y-auto pt-2">
                        <IconPicker />
                    </div>
                </div>
            )}
        </>
    )
}