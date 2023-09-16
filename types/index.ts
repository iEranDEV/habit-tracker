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
export type HabitDetails = undefined | {
    amount: number,
    unit?: string,
    counterType: CounterType
}

export interface Habit {
    id: string,
    name: string,
    type: HabitType,
    description: string,
    category: string,
    createdAt: Timestamp,
    createdBy: string,
    frequency: Array<number>,
    startDate: Timestamp,
    endDate: Timestamp | undefined,
    details: HabitDetails
}

export type UserSettings = {
    firstDayOfWeek: 0 | 1,
    language: string,
    modifyDaysPast: boolean,
    modifyDaysFuture: boolean
}

export interface User {
    id: string,
    name: string,
    email: string,
    settings: UserSettings
}

export interface CheckIn {
    id: string,
    date: Timestamp,
    habit: string,
    value: boolean | number,
}