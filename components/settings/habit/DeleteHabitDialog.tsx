import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { HabitWithData } from "@/types";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteHabitDialogProps {
    item: HabitWithData,
    open: boolean,
    setOpen: (open: boolean) => void
}

export default function DeleteHabitDialog({ item, open, setOpen }: DeleteHabitDialogProps) {

    const [loading, setLoading] = useState(false);

    const { toast } = useToast()
    const router = useRouter();

    const deleteItem = async () => {
        setLoading(true);
        const response = await fetch(`/api/habit/${item.id}`, {
            method: 'DELETE'
        })
        const data = await response.json();
        if (data) {
            router.refresh();
            toast({
                title: 'Success!',
                description: `You have successfully removed habit ${item.name}!`
            })
        }
        setLoading(true);
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this habit and all your progress.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={deleteItem} disabled={loading}>
                        {loading ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <span>Continue</span>
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}