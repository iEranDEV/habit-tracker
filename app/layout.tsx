'use client';

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Habit tracker app',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NavBar />
				<div className='ml-10'>
					{children}
				</div>
			</body>
		</html>
	)
}
