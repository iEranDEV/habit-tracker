'use client';

import HabitList from "./components/habit-list/HabitList";
import HabitListHeader from "./components/habit-list/HabitListHeader";
import Header from "./components/utils/Header";
import ControlPanel from "./components/control-panel/ControlPanel";
import ModalManager from "./components/modal/ModalManager";

export default function Home() {

	return (
		<div className="w-screen lg:w-[1024px] py-10 text-neutral-700">

			{/* Header */}
			<Header />

			{/* Body */}
			<div className="w-full flex">
				<div className="basis-full lg:basis-full flex flex-col">

					{/* Habits control panel */}
					<div className="w-full sticky top-0 flex flex-col">
						<ControlPanel />

						{/* Habits table header */}
						<HabitListHeader />
					</div>

					{/* Habits list */}
					<HabitList />
				</div>
			</div>

			<ModalManager />
		</div>
	)
}
