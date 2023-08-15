'use client';

import { NotificationContext } from '@/context/NotificationContext';
import { useContext, useState } from 'react';

export default function TestPage() {

    const { addNotification } = useContext(NotificationContext);

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <button onClick={() => {
                addNotification('success message test, blah blah blah blah blah blah blah blah blah blah fffffffffffffffff', 'SUCCESS')
            }}>Click</button>
        </div>
    )
}