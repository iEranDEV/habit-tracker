import { useFormContext } from "react-hook-form";
import Input from "../../../utils/general/Input";
import TypeSelector from "./TypeSelector";
import { useEffect, useState } from "react";

export default function FormStageTwo() {

    const methods = useFormContext();

    const [type, setType] = useState(methods.getValues('type') !== undefined ? methods.getValues('type') : 'default');

    useEffect(() => {
        methods.register('type');
    }, []);

    useEffect(() => {
        methods.setValue('type', type);
    }, [type])

    return (
        <div className="flex gap-4">
            <div className="flex basis-3/5 flex-col gap-4">
                <Input id={"name"} label={"Habit name"} placeholder={"Enter habit name"} />
                <Input id={"description"} label={"Description (optional)"} placeholder={"Enter description"} />
            </div>

            <div className="flex basis-2/5 flex-col gap-4 border-l border-neutral-200 pl-4">
                <TypeSelector type={type} setType={setType} />
            </div>
        </div>
    )
}