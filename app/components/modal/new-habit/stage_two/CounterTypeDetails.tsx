import Input from "@/app/components/utils/general/Input";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export default function CounterTypeDetails() {

    const methods = useFormContext();

    useEffect(() => {
        methods.unregister('details');
    }, []);

    return (
        <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-full mt-3 border-t flex flex-col gap-4 pt-3 border-neutral-200"
        >
            <Input id={"details.counter_type"} label={"At least"} placeholder={"At least"} />
        </motion.div>
    )
}