import Input from "../../utils/general/Input";

export default function FormStageTwo() {

    return (
        <div className="flex gap-4">
            <div className="flex basis-3/5 flex-col gap-4">
                <Input id={"name"} label={"Habit name"} placeholder={"Enter habit name"} />
                <Input id={"description"} label={"Description (optional)"} placeholder={"Enter description"} />
            </div>

            <div className="flex basis-2/5 flex-col gap-4 border-l border-neutral-200 pl-4">
                test
            </div>
        </div>
    )
}