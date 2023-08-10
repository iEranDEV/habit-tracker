interface Category {
    id: string,
    name: string,
    color: string,
    icon: string,
    createdBy: string
}

type Habit = {
    id: string,
    name: string,
    category: string,
    // type: string,
    createdAt: Date,
    startAt: Date,
    // repeat: string,
}

type CheckIn = {
    id: string,
    date: Date,
    habit: string,
    count?: number,
    status?: string
}