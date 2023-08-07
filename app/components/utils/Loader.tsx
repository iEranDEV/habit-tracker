import { motion } from "framer-motion";

export default function Loader() {

    return (
        <div className="w-[100svw] h-[100svh] bg-neutral-50 flex justify-center items-center">
            <div className="w-32 h-10 grid grid-cols-8 gap-1">
                <div className="h-full w-full relative">
                    <motion.div animate={{ top: ['0%', '100%', '0%']}} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="absolute bg-neutral-200 rounded-full left-0 w-full aspect-square">
                        
                    </motion.div>
                </div>
                <div className="h-full w-full relative">
                    <motion.div animate={{ top: ['0%', '100%', '0%']}} transition={{ repeat: Infinity, duration: 1, delay: 0.1 }} className="absolute bg-neutral-200 rounded-full left-0 w-full aspect-square">
                        
                    </motion.div>
                </div>
                <div className="h-full w-full relative">
                    <motion.div animate={{ top: ['0%', '100%', '0%']}} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="absolute bg-neutral-200 rounded-full left-0 w-full aspect-square">
                        
                    </motion.div>
                </div>
                <div className="h-full w-full relative">
                    <motion.div animate={{ top: ['0%', '100%', '0%']}} transition={{ repeat: Infinity, duration: 1, delay: 0.3 }} className="absolute bg-neutral-200 rounded-full left-0 w-full aspect-square">
                        
                    </motion.div>
                </div>
                <div className="h-full w-full relative">
                    <motion.div animate={{ top: ['0%', '100%', '0%']}} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="absolute bg-neutral-200 rounded-full left-0 w-full aspect-square">
                        
                    </motion.div>
                </div>
                <div className="h-full w-full relative">
                    <motion.div animate={{ top: ['0%', '100%', '0%']}} transition={{ repeat: Infinity, duration: 1, delay: 0.5 }} className="absolute bg-neutral-200 rounded-full left-0 w-full aspect-square">
                        
                    </motion.div>
                </div>
                <div className="h-full w-full relative">
                    <motion.div animate={{ top: ['0%', '100%', '0%']}} transition={{ repeat: Infinity, duration: 1, delay: 0.6 }} className="absolute bg-neutral-200 rounded-full left-0 w-full aspect-square">
                        
                    </motion.div>
                </div>
                <div className="h-full w-full relative">
                    <motion.div animate={{ top: ['0%', '100%', '0%']}} transition={{ repeat: Infinity, duration: 1, delay: 0.7 }} className="absolute bg-neutral-200 rounded-full left-0 w-full aspect-square">
                        
                    </motion.div>
                </div>
            </div>
        </div>
    )
}