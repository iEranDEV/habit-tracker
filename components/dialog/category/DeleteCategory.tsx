import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Category } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteCategoryDialogProps {
    item: Category,
    open: boolean,
    setOpen: (open: boolean) => void
}

export default function DeleteCategoryDialog({ item, open, setOpen }: DeleteCategoryDialogProps) {

    const [loading, setLoading] = useState(false);

    const { toast } = useToast()
    const router = useRouter();


    const deleteItem = async () => {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/category/${item.id}`, {
            method: 'DELETE'
        })
        const data = await response.json();

        console.log(data);
        if (data) {
            router.refresh();
            toast({
                title: 'Success!',
                description: `You have successfully removed category ${item.name}!`
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
                        This action cannot be undone. This will permanently delete this category and the category of all related habits will be changed to <b>Other</b>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={deleteItem}>
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