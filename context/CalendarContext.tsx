'use client';

import { createContext, useState } from "react";

export const CalendarContext = createContext({
    viewMode: 'week',
    selectedDate: new Date(),
    setViewMode: (viewMode: 'day' | 'week' | 'month') => { },
    setSelectedDate: (selectedDate: Date) => { }
});

export function CalendarContextProvider({ children }: { children: React.ReactNode }) {
    const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    return (
        <CalendarContext.Provider value={{ viewMode, setViewMode, selectedDate, setSelectedDate }}>
            {children}
        </CalendarContext.Provider>
    )
}