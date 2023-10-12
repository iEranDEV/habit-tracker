"use client";
import { Button } from '@/components/ui/button';
import { HabitWithData } from '@/types';
import 'chart.js/auto';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Bar } from "react-chartjs-2";

interface StatsGraphProps {
    item: HabitWithData
}

const getData = (habit: HabitWithData, year: number): number[] => {
    let data: number[] = [];

    Array.from({ length: 12 }).forEach((_, month) => {
        let count = 0;
        habit.checkIns?.filter((item) => item.date.getMonth() === month && item.date.getFullYear() === year).forEach((checkIn) => {
            switch (habit.type) {
                case 'DEFAULT':
                    if (checkIn.details?.value) count++;
                    break;
                case 'COUNTER':
                    if (!habit.details.amount || !checkIn.details?.amount) break;
                    switch (habit.details.counterType) {
                        case 'AT_LEAST':
                            if (checkIn.details?.amount >= habit.details.amount) count++;
                            break;
                        case 'EXACTLY':
                            if (checkIn.details?.amount === habit.details.amount) count++;
                            break;
                        case 'LESS_THAN':
                            if (checkIn.details?.amount < habit.details.amount) count++;
                            break;
                    }
                    break;
            }
        })
        data.push(count);
    })

    return data;
}

export default function StatsGraph({ item }: StatsGraphProps) {

    const [year, setYear] = useState(new Date().getFullYear());

    const data = getData(item, year);

    return (
        <div className='space-y-2'>
            <div className='justify-between flex items-center'>
                <Button onClick={() => setYear(year - 1)} variant={'outline'} size={'icon'}>
                    <ChevronLeft size={20} />
                </Button>

                <p className="text-lg">{year}</p>

                <Button onClick={() => setYear(year + 1)} variant={'outline'} size={'icon'}>
                    <ChevronRight size={20} />
                </Button>
            </div>
            <Bar
                height={75}
                data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                        {
                            data: data,
                            backgroundColor: "#BF80FF",
                            borderRadius: 8,
                        },
                    ],
                }}
                options={{
                    plugins: {
                        tooltip: {
                            enabled: false
                        },
                        legend: {
                            display: false
                        },
                    },
                    scales: {
                        x: {
                            border: {
                                display: false
                            },
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            beginAtZero: true,
                            max: 31,
                            border: {
                                display: false
                            },
                            ticks: {
                                display: false,

                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0)',
                                display: false
                            }
                        },
                    }
                }}
            />
        </div>
    )
}