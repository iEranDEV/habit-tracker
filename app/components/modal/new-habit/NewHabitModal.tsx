import { useState } from "react";
import Modal from "../Modal";
import Button from "../../utils/Button";
import { ArrowBigLeft, ArrowBigRight, Check } from "lucide-react";
import FormStageOne from "./FormStageOne";
import FormStageTwo from "./FormStageTwo";
import FormStageThree from "./FormStageThree";
import { FormProvider, useForm } from "react-hook-form";

export default function NewHabitModal() {

    const [stage, setStage] = useState(1);

    const methods = useForm();

    const onSubmit = async (data: any) => {
        console.log(stage);
        console.log(data);
    }

    return (
        <Modal title={'Add new habit'}>
            <FormProvider {...methods}>
                <form noValidate onSubmit={methods.handleSubmit(onSubmit)} className="w-full h-full flex pt-2 flex-col gap-2">

                    {/* Body */}
                    <div>
                        {{
                            1: <FormStageOne />,
                            2: <FormStageTwo />,
                            3: <FormStageThree />,
                        }[stage]}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center relative">
                        {stage > 1 ? (
                            <Button secondary onClick={() => setStage(stage - 1)} name={"Back"} icon={<ArrowBigLeft />} />
                        ) : (
                            <div></div>
                        )}

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
                            {Array.from({length: 3}).map((_, i) => (
                                <div key={i} className={`rounded-full h-2 w-2 ${stage > i ? 'bg-purple-400' : 'bg-neutral-300' }`}></div>
                            ))}
                        </div>

                        {stage === 3 ? (
                            <Button submit name={"Submit"} icon={<Check />} />
                        ) : (
                            <Button onClick={(e: any) => {
                                e.preventDefault();
                                setStage(stage + 1)
                            }} name={"Next"} icon={<ArrowBigRight />} />
                        )}
                    </div>

                </form>
            </FormProvider>
        </Modal>
    )
}