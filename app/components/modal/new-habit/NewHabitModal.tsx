import { useState } from "react";
import Modal from "../Modal";

export default function NewHabitModal() {

    const [stage, setStage] = useState(1);

    return (
        <Modal title={'Create new habit'}>
            <div className="w-full h-full flex flex-col gap-2">

                {/* Body */}
                <div>
                    body
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center">
                    {stage > 1 ? (
                        <div>back</div>
                    ) : (
                        <div></div>
                    )}

                    <div>kropki</div>

                    {stage === 4 ? (
                        <div>end</div>
                    ) : (
                        <div>next</div>
                    )}
                </div>

            </div>
        </Modal>
    )
}