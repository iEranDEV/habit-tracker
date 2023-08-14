'use client';

import { AlertTriangle, BadgeCheck, MousePointerClick, X } from "lucide-react";
import { createContext, useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';

export const NotificationContext = createContext({
    addNotification: (message: string, type?: 'SUCCESS' | 'ERROR') => {}
});

type NotificationElementProps = {
    id: string,
    message: string,
    type: 'SUCCESS' | 'ERROR',
    onClick?: Function,
    removeNotification: Function
}

function NotificationElement({ id, message, type, onClick, removeNotification }: NotificationElementProps) {
    const [hovered, setHovered] = useState(false);
    const [time, setTime] = useState(7);

    useEffect(() => {
        if(time === 0) {
            removeNotification(id);
        }

        const timer = setTimeout(() => {
            setTime(time - 1);
        }, 1000)

        return () => clearTimeout(timer);
    }, [time]);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onClick ? onClick : removeNotification(id)}
            className={`w-full p-2 cursor-pointer rounded-lg flex justify-between items-center ${type === 'SUCCESS' ? 'bg-green-200 text-green-500' : 'bg-red-200 text-red-500'} `}
        >
            {hovered ? (
                <>
                    {onClick ? (
                        <MousePointerClick size={20} />
                    ) : (
                        <X size={20} />
                    )}
                </>
            ) : (
                <>
                    <div className="">
                        {type === 'SUCCESS' ? (
                            <BadgeCheck size={20} />
                        ) : (
                            <AlertTriangle size={20} />
                        )}
                    </div>
                </>
            )}
            <div>
                {time}
            </div>
        </div>
    )
}

export function NotificationContextProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState(Array<INotification>());

    const addNotification = (message: string, type: 'SUCCESS' | 'ERROR' = 'SUCCESS') => {
        setNotifications([...notifications, { id: uuid(), message, type }]);
    }

    const removeNotification = (id: string) => {
        setNotifications([...notifications.filter((item) => item.id !== id)]);
    }

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            <>
                {children}
                <div className="fixed top-0 right-0 w-60 p-2 flex flex-col gap-2">
                    {notifications.map((item) => (
                        <NotificationElement key={item.id} {...item} removeNotification={removeNotification} />
                    ))}
                </div>
            </>
        </NotificationContext.Provider>
    )
}