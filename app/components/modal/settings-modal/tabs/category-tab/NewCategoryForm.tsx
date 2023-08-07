import IconButton from '@/app/components/utils/IconButton';
import { Plus, icons } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

export default function NewCategoryForm() {

    const [icon, setIcon] = useState<keyof typeof icons>('MailQuestion')
    const [picker, setPicker] = useState(false);

    const IconPicker = dynamic(() => import('./IconPicker'));

    const getIcon = () => {
        const LucideIcon = icons[icon];

        return <LucideIcon size={16} />
    }

    return (
        <>
            <form className="flex gap-2 items-center">
                <div className="rounded-lg flex divide-x divide-neutral-200 border border-neutral-200">
                    <div onClick={() => setPicker(!picker)} className="cursor-pointer h-8 w-8 flex justify-center items-center">
                        {getIcon()}
                    </div>
                    
                    <input type="text" className="rounded-r-lg bg-neutral-50 px-2 placeholder-neutral-200" placeholder="Enter habit name" />
                </div>

                <IconButton icon={<Plus size={16} />} />
            </form>
            
            {picker && <IconPicker icon={icon} setIcon={setIcon} setPicker={setPicker} />}
        </>
    )
}