import { motion } from "framer-motion";

export default function CounterTypeDetails() {

    return (

        <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-full mt-3 h-10 border-t pt-3 border-neutral-200"
        >
            counter
        </motion.div>
    )
}