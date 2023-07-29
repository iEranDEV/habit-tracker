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
					'50': '#f7f7f5',
					'100': '#edede9',
					'200': '#d8d7d0',
					'300': '#bfbfb2',
					'400': '#a5a392',
					'500': '#938f7c',
					'600': '#868070',
					'700': '#706b5e',
					'800': '#5d594f',
					'900': '#4c4842',
					'950': '#282622',
				},
				
				
			}
		},
	},
	plugins: [],
}
