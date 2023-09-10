import { Timestamp } from "firebase/firestore"

export interface Category {
    id: string,
    name: string,
    color: string,
    icon: string,
    createdBy: string,
    createdAt: Timestamp
}

export type HabitType = 'default' | 'counter' | 'checklist' | 'timer';
export type CounterType = 'AtLeast' | 'LessThan' | 'Exactly'

export interface Habit {
    id: string,
    name: string,
    type: HabitType,
    description: string,
    category: string,
    createdAt: Timestamp,
    startAt: Timestamp,
    details: undefined | {
        amount: number,
        unit?: string,
        counterType: CounterType
    }
}

export interface CheckIn {
    id: string,
    date: Date,
    habit: string,
    count?: number,
    status?: string
}