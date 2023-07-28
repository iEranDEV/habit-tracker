'use client';

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './components/navbar/NavBar'

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
			<body className={inter.className + ' flex flex-col-reverse md:flex-row items-center'}>
				<NavBar />
				{children}
			</body>
		</html>
	)
}
