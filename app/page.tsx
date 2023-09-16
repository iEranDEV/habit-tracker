'use client';

import { CalendarContextProvider } from "@/context/CalendarContext";
import Header from "@/components/layout/Header";
import ControlPanel from "@/components/layout/ControlPanel";
import HabitList from "@/components/layout/habit_list/HabitList";
import { ProtectedRoute } from "@/context/UserContext";

export default function Home() {

    return (
        <ProtectedRoute>
            <div className="w-full flex justify-center">
                <div className="w-full max-w-[1024px] py-10 text-neutral-700">
                    {/* Header */}
                    <Header />

                    <CalendarContextProvider>
                        {/* Body */}
                        <div className="w-full flex">
                            <div className="basis-full space-y-4 lg:basis-full flex flex-col">

                                {/* Habits control panel */}
                                <div className="w-full sticky top-0">
                                    <ControlPanel />
                                </div>

                                {/* Habits list */}
                                <HabitList />
                            </div>
                        </div>
                    </CalendarContextProvider>
                </div >
            </div >
        </ProtectedRoute>
    )
}
