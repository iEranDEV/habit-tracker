interface Category {
    id: string,
    name: string,
    color: string,
    icon: string,
    createdBy: string
}

interface Habit {
    id: string,
    name: string,
    category: string,
    // type: string,
    createdAt: Date,
    startAt: Date,
    // repeat: string,
}

interface CheckIn {
    id: string,
    date: Date,
    habit: string,
    count?: number,
    status?: string
}

interface INotification {
    id: string,
    type: 'SUCCESS' | 'ERROR',
    message: string,
    onClick?: Function
}