export default function HabitListHeader() {

    return (
        <div className="border-b border-neutral-200 flex items-end w-full py-2 text-sm text-neutral-400">

            {/* Habit name & category */}
            <div className="basis-1/4">
                Habit name
            </div>

            {/* Days */}
            <div className="grow px-4 flex justify-between items-center">
                <div className="p-3 w-12 justify-center items-center rounded-lg bg-purple-100 text-purple-500 flex flex-col">
                    <span className="text-sm">Mon</span>
                    <p className="font-semibold text-lg">31</p>
                </div>
                <div className="p-3 justify-center items-center rounded-lg  flex flex-col">
                    <span className="text-sm">Tue</span>
                    <p className="font-semibold text-lg">01</p>
                </div>
                <div className="p-3 justify-center items-center rounded-lg  flex flex-col">
                    <span className="text-sm">Wed</span>
                    <p className="font-semibold text-lg">02</p>
                </div>
                <div className="p-3 justify-center items-center rounded-lg  flex flex-col">
                    <span className="text-sm">Thu</span>
                    <p className="font-semibold text-lg">03</p>
                </div>
                <div className="p-3 justify-center items-center rounded-lg  flex flex-col">
                    <span className="text-sm">Fri</span>
                    <p className="font-semibold text-lg">04</p>
                </div>
                <div className="p-3 justify-center items-center rounded-lg  flex flex-col">
                    <span className="text-sm">Sat</span>
                    <p className="font-semibold text-lg">05</p>
                </div>
                <div className="p-3 justify-center items-center rounded-lg  flex flex-col">
                    <span className="text-sm">Sun</span>
                    <p className="font-semibold text-lg">06</p>
                </div>
            </div>

            {/* Blank spot for additional data */}
            <div className="basis-20"></div>

        </div>
    )
}