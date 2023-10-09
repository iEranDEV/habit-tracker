'use client';

import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";

interface DropdownProps {
    options: React.ReactNode[],
    toggler: React.ReactNode,
    header: React.ReactNode,
    type?: string,
}

export default function Dropdown({ options, toggler, header, type }: DropdownProps) {

    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Dropdown (> sm) */}
            <div className="max-sm:hidden h-full flex items-center">
                <DropdownMenu onOpenChange={setOpen}>
                    <DropdownMenuTrigger>
                        {toggler}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            {options.map((item, i) => (
                                <DropdownMenuItem key={i}>
                                    {item}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

            {/* Alert (<= sm) */}
            <div className="sm:hidden h-full flex items-center">
                <div onClick={() => setOpen(!open)}>
                    {toggler}
                </div>

                <AnimatePresence>
                    {open && (
                        <>
                            <div onClick={() => setOpen(false)} className="bg-background/50 md:hidden backdrop-blur-sm fixed left-0 top-0 w-[100lvw] h-[100lvh] z-10"></div>
                            <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '100%' }}
                                className="fixed z-50 flex flex-col space-y-4 rounded-lg border border-border bg-background left-0 bottom-0 w-[100lvw] px-4 py-10"
                            >
                                {type && <p className="text-center font-semibold">{type}</p>}
                                <div className="flex justify-center">
                                    {header}
                                </div>

                                {options.map((item, i) => (
                                    <div key={i}>
                                        {item}
                                    </div>
                                ))}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}