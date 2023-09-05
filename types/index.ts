import { Timestamp } from "firebase/firestore"

export interface Category {
    id: string,
    name: string,
    color: string,
    icon: string,
    createdBy: string,
    createdAt: Timestamp
}

export interface Habit {
    id: string,
    name: string,
    description: string,
    category: string,
    type: 'default' | 'counter' | 'checklist',
    createdAt: Date,
    startAt: Date,
    details: any,
}

export interface CheckIn {
    id: string,
    date: Date,
    habit: string,
    count?: number,
    status?: string
}

export interface INotification {
    id: string,
    type: 'SUCCESS' | 'ERROR',
    message: string,
    onClick?: Function
}