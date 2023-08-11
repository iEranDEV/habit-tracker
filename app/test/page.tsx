'use client';

import opentype from 'opentype.js'
import { useState } from 'react';

export default function TestPage() {
    const [path, setPath] = useState('');

    const read = async () => {
        opentype.load('/Borel-Regular.ttf', (err, font) => {
            if(!font) return;

            const path = font.getPath('iEran', 100, 100, 100);
            setPath(path.toPathData(5));
        })
    }

    read();

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <svg width={400} height={400} className='bg-red-100/50 test-svg'>
                <path d={path} />
            </svg>
        </div>
    )
}