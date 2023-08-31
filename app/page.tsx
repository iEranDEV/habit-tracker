'use client';

import HabitList from "./components/habit-list/HabitList";
import HabitListHeader from "./components/habit-list/HabitListHeader";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { UserContextProvider } from "@/context/UserContext";
import ModalContextProvider from "@/context/ModalContext";
import { CalendarContextProvider } from "@/context/CalendarContext";
import ControlPanel from "@/components/ControlPanel";
import Header from "@/components/Header";

export default function Home() {

	const [auth, setAuth] = useState(false);

	const { loggedUser } = useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		setAuth(false);
		if (loggedUser === null) {
			router.push('/auth/login')
		} else setAuth(true)
	}, [loggedUser])

	if (auth) return (
		<UserContextProvider>
			<ModalContextProvider>
				<div className="w-full flex justify-center">
					<div className="w-full max-w-[1024px] py-10 text-neutral-700">
						{/* Header */}
						<Header />

						<CalendarContextProvider>
							{/* Body */}
							<div className="w-full flex">
								<div className="basis-full lg:basis-full flex flex-col">

									{/* Habits control panel */}
									<div className="w-full sticky top-0 flex-col">
										<ControlPanel />

										{/* Habits table header */}
										{/* <HabitListHeader /> */}
									</div>

									{/* Habits list */}
									{/* <HabitList /> */}
								</div>
							</div>
						</CalendarContextProvider>
					</div>
				</div>
			</ModalContextProvider>
		</UserContextProvider>
	)
}
