import React from "react";

export interface NavItem {
    title: string,
    href: string,
    icon: React.ReactNode,
}

export interface Category {
    id: string,
    name: string,
    color: string,
    icon: string,
    createdBy: string,
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
    createdBy: string,
    frequency: Array<number>,
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
    habit: string,
    value: boolean | number,
}