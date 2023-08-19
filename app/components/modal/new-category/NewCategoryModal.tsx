import { FormEvent, useContext, useState } from "react";
import Modal from "../Modal";
import { Check, Loader2, MousePointerClick, TextCursorInput, icons } from "lucide-react";
import dynamic from "next/dynamic";
import ColorPicker from "./ColorPicker";
import { addCategory } from "@/firebase/db/category";
import { UserContext } from "@/context/UserContext";
import { ModalContext } from "@/context/ModalContext";
import Button from "../../utils/general/Button";

export default function NewCategoryModal() {
    const [color, setColor] = useState('#8b5cf6');
    const [icon, setIcon] = useState<keyof typeof icons>('MailQuestion')
    const [picker, setPicker] = useState(false);
    const [name, setName] = useState('');

    const [loading, setLoading] = useState(false);

    const IconPicker = dynamic(() => import('./IconPicker'));

    const userContext = useContext(UserContext);
    const modalContext = useContext(ModalContext);

    const getIcon = () => {
        const LucideIcon = icons[icon];

        return <LucideIcon />
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        const result = await addCategory(name, color, icon, userContext.user.id);

        if('id' in result) {
            userContext.setCategories([...userContext.categories, {
                id: result.id,
                name,
                color,
                icon,
                createdBy: userContext.user.id
            } as Category])
            modalContext.setModal('settings');
        } else {
            // Error
        }

        return setLoading(false);
    }

    return (
        <Modal title={'Create new category'} back="settings">
            <form noValidate onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-4">

                <div className="flex flex-col gap-4 w-96">
                    {/* Name */}
                    <div className="flex flex-col gap-1 max-w-md">
                        <p className="text-neutral-400 font-semibold text-sm">Category's name</p>
                        <div className='w-full p-1 relative rounded-lg border gap-1 border-neutral-200 flex items-center'>
                            <div className={`border-r px-2 border-neutral-200 text-neutral-400`}>
                                <TextCursorInput size={20} />
                            </div>
                            <input defaultValue={name} onChange={(e) => setName(e.target.value)} type='text' className='h-8 bg-neutral-50 grow palceholder-neutral-200 ml-2 focus:outline-none' placeholder="Enter category's name"/>
                        </div>
                    </div>

                    {/* Icon */}
                    <div className="flex flex-col gap-1">
                        <p className="text-neutral-400 font-semibold text-sm">Category's icon</p>
                        <div className="flex items-center gap-2 relative">
                            <button type="button" 
                                onClick={() => setPicker(!picker)}
                                className="flex grow cursor-pointer hover:brightness-95 transition-all justify-center gap-2 text-purple-500 items-center px-4 py-2 bg-purple-200 rounded-lg"
                            >
                                <MousePointerClick />
                                <p>Open icon selection</p>
                            </button>
                            <div className="border border-neutral-200 p-2 rounded-lg text-neutral-500">
                                {getIcon()}
                            </div>
                            {picker && <IconPicker icon={icon} setIcon={setIcon} setPicker={setPicker} />}
                        </div>
                    </div>

                    {/* Color */}
                    <div className="flex flex-col gap-1">
                        <p className="text-neutral-400 font-semibold text-sm">Category's color</p>
                        <ColorPicker color={color} setColor={setColor} />
                    </div>
                </div>

                {/* Footer / Submit button */}
                <div className="w-full flex justify-end">
                    <Button 
                        name="Add habit" 
                        icon={loading ? (
                            <div className="animate-spin">
                                <Loader2 />
                            </div>
                        ) : (
                            <Check />
                        )}
                        submit
                     />
                </div>

            </form>
        </Modal>
    )
}