import ControlPanel from "@/components/layout/ControlPanel";
import Header from "@/components/layout/Header";
import HabitList from "@/components/layout/habit_list/HabitList";
import { CalendarContextProvider } from "@/context/CalendarContext";
import { ProtectedRoute } from "@/context/UserContext";
import { Suspense } from "react";
export default function Home() {

    return (
        <ProtectedRoute>
            <div className="w-full flex justify-center">
                <div className="w-full max-w-[1024px] pt-2 md:pt-10 text-neutral-700">
                    <Header />

                    <CalendarContextProvider>
                        <div className="w-full flex">
                            <div className="basis-full space-y-4 lg:basis-full flex flex-col">
                                <div className="w-full sticky top-0">
                                    <ControlPanel />
                                </div>
                                <Suspense fallback={<p>Loading</p>}>
                                    <HabitList />
                                </Suspense>
                            </div>
                        </div>
                    </CalendarContextProvider>
                </div>
            </div>
        </ProtectedRoute >
    )
}
