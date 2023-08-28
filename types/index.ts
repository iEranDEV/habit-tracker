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
    description: string,
    category: string,
    type: 'default' | 'counter' | 'checklist',
    createdAt: Date,
    startAt: Date,
    details: any,
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