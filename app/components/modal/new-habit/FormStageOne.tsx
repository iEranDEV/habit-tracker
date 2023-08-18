import { Camera } from "lucide-react";
import Input from "../../utils/Input";

export default function FormStageOne() {

    return (
        <div>
            <Input icon={<Camera />} id={"test_1"} label={"Test #1"} placeholder={"dawf"} />
        </div>
    )
}