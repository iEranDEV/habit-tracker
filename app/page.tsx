import ControlPanel from "@/components/root/ControlPanel";
import Header from "@/components/root/Header";
import HabitList from "@/components/root/HabitList/HabitList";
import { CalendarContextProvider } from "@/context/CalendarContext";
import { ProtectedRoute } from "@/context/UserContext";
import { Suspense } from "react";
import HabitListSkeleton from "@/components/root/HabitList/HabitListSkeleton";
import HabitListHeader from "@/components/root/HabitList/HabitListHeader";

export default function Home() {

    return (
        <ProtectedRoute>
            <div className="w-full flex justify-center">
                <div className="w-full max-w-[1024px] pt-2 md:pt-10 text-neutral-700">
                    <Header />

                    <CalendarContextProvider>
                        <div className="w-full flex bg-background">
                            <div className="basis-full lg:basis-full flex flex-col">
                                <div className="w-full sticky top-0 z-50">
                                    <ControlPanel />
                                </div>
                                <HabitListHeader />
                                <Suspense fallback={<HabitListSkeleton />}>
                                    <HabitList />
                                </Suspense>
                            </div>
                        </div>
                    </CalendarContextProvider>
                </div>
            </div>
        </ProtectedRoute>
    )
}
