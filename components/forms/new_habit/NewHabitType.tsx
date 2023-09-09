import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export default function NewHabitTypeForm({ stage, setStage }: { stage: number, setStage: Function }) {
    const methods = useFormContext();

    // const [selected, setSelected] = useState(methods.getValues('category') || 'default_other')

    /*useEffect(() => {
        if (selected) {
            methods.setValue('category', selected);
        }
    }, [selected, methods])*/

    return (
        <div className="space-y-6">
            <div className="space-y-2" >
                <Label>Select habit type</Label>
                test
            </div >

            <div className="flex justify-between">
                <Button variant={'secondary'} type="button" onClick={(e) => {
                    e.preventDefault();
                    setStage(stage - 1);
                }}>Go back</Button>
                <Button type="submit">Continue</Button>
            </div >
        </div>
    )
}