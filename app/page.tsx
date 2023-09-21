import Header from "@/components/layout/Header";
import { ProtectedRoute } from "@/context/UserContext";
export default function Home() {

    return (
        <ProtectedRoute>
            <div className="w-full flex justify-center">
                <div className="w-full max-w-[1024px] pt-2 md:pt-10 text-neutral-700">
                    <Header />

                    {/* 
                        <CalendarContextProvider>
                            <div className="w-full flex">
                                <div className="basis-full space-y-4 lg:basis-full flex flex-col">
                                    <div className="w-full sticky top-0">
                                        <ControlPanel />
                                    </div>
                                    <HabitList />
                                </div>
                            </div>
                        </CalendarContextProvider>
                    */}
                </div>
            </div>
        </ProtectedRoute >
    )
}
