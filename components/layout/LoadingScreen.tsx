import { Loader2 } from "lucide-react";

export default function LoadingScreen() {

    return (
        <div className='w-[100lvw] h-[100lvh] bg-background flex justify-center items-center'>
            <div className='animate-spin text-muted-foreground'>
                <Loader2 />
            </div>
        </div>
    )
}