'use client';

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import ViewModeToggler from "./components/ViewModeToggler";


export default function Home() {
	return (
		<div className="w-screen lg:w-[1024px] py-10 text-neutral-700">

			{/* Header */}
			<header className="pb-2 pt-6">
				<div className="h-full w-full flex justify-between items-center">
					<p className="select-none font-borel text-neutral-700 text-3xl">Good morning, Olaf</p>
					<div className="">
						options
					</div>
				</div>
			</header>

			{/* Body */}
			<div className="w-full flex sticky top-0">
				<div className="basis-full lg:basis-full flex flex-col">

					{/* Habits control panel */}
					<div className="w-full border-b py-2 border-gray-200 sticky top-0 flex justify-between items-center">
						
						{/* Date & control buttons */}
						<div className="flex items-center gap-2">
							<div className="flex items-center gap-2 text-neutral-400">

								{/* Left arrow */}
								<div className="h-10 w-10 flex justify-center cursor-pointer transition-all hover:bg-purple-100 hover:border-purple-300 hover:text-purple-400 bg-neutral-50 items-center rounded-lg border border-neutral-200">
									<ChevronLeft />
								</div>

								{/* Right arrow */}
								<div className="h-10 w-10 flex justify-center cursor-pointer transition-all hover:bg-purple-100 hover:border-purple-300 hover:text-purple-400 bg-neutral-50 items-center rounded-lg border border-neutral-200">
									<ChevronRight />
								</div>

							</div>
							<div className="text-lg font-semibold">
								Mon, 31 July 2023
							</div>
						</div>

						{/* View mode, new habit button */}
						<div className="flex items-center gap-2">
							<ViewModeToggler />
							<div className="flex cursor-pointer hover:brightness-95 transition-all justify-center gap-2 text-purple-500 items-center px-4 py-2 bg-purple-200 rounded-lg">
								<Plus />
								<span>Add habit</span>
							</div>
						</div>
					
					</div>

					{/* Habits list */}
					<div className="w-full h-10 py-2">
						habits
					</div>
				</div>
			</div>
		</div>
	)
}
