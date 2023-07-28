/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				'light': {
					'50': '#fcf8f0',
					'100': '#f7eedd',
					'200': '#f1e0c5',
					'300': '#e3c08e',
					'400': '#d79f60',
					'500': '#cf8640',
					'600': '#c07036',
					'700': '#a0582e',
					'800': '#81482b',
					'900': '#683c26',
					'950': '#381d12',
				},
				'secondary': {
					'50': '#f5f8f7',
					'100': '#dee9e5',
					'200': '#bcd3cb',
					'300': '#93b5aa',
					'400': '#6d9489',
					'500': '#52796f',
					'600': '#406159',
					'700': '#364f49',
					'800': '#2e413d',
					'900': '#293835',
					'950': '#141f1c',
				},
				'primary': {
					'50': '#f5f8f8',
					'100': '#ddeae9',
					'200': '#bbd4d4',
					'300': '#91b6b7',
					'400': '#699598',
					'500': '#4f7a7d',
					'600': '#3e5f63',
					'700': '#354f52',
					'800': '#2d3f42',
					'900': '#283739',
					'950': '#141d1f',
				},
				
			}
		},
	},
	plugins: [],
}
