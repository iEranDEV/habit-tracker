import { useState } from "react";
import Modal from "../Modal";
import { Plus, icons } from "lucide-react";
import dynamic from "next/dynamic";
import ColorPicker from "./ColorPicker";

export default function NewCategoryModal() {
    const [color, setColor] = useState('#FFFF00');
    const [icon, setIcon] = useState<keyof typeof icons>('MailQuestion')
    const [picker, setPicker] = useState(false);

    const IconPicker = dynamic(() => import('./IconPicker'));

    const getIcon = () => {
        const LucideIcon = icons[icon];

        return <LucideIcon size={16} />
    }

    return (
        <Modal title={'Create new category'} back="settings">
            <>
                <form className="flex flex-col gap-2">
                    <div className='grid grid-cols-2 gap-2 divide-x divide-neutral-200'>
                        <div className="rounded-lg h-min w-full flex divide-x divide-neutral-200 border border-neutral-200">
                            <div onClick={() => setPicker(!picker)} className="cursor-pointer h-8 w-8 flex justify-center items-center">
                                {getIcon()}
                            </div>
                            
                            <input type="text" className="rounded-r-lg bg-neutral-50 px-2 placeholder-neutral-300" placeholder="Enter habit name" />
                        </div>
                        <ColorPicker color={color} setColor={setColor} />
                    </div>
                    <div className="flex w-36 mx-4 text-sm cursor-pointer hover:brightness-95 transition-all justify-center gap-2 text-purple-500 items-center px-4 py-2 bg-purple-200 rounded-lg">
                        <Plus size={16} />
                        <div>Add category</div>
                    </div>
                </form>
                
                {picker && <IconPicker icon={icon} setIcon={setIcon} setPicker={setPicker} />}
            </>
        </Modal>
    )
}