import { Timestamp } from "firebase/firestore"

export interface Category {
    id: string,
    name: string,
    color: string,
    icon: string,
    createdBy: string,
    createdAt: Timestamp
}

type HabitTypeMap = {
    'default': string,
    'counter': string,
    'checklist': string,
    'timer': string
}

export interface Habit<T extends HabitType> {
    id: string,
    name: string,
    description: string,
    category: string,
    type: T,
    createdAt: Timestamp,
    startAt: Timestamp,
    details: HabitTypeMap[T],
}

export type HabitType = keyof HabitTypeMap;

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