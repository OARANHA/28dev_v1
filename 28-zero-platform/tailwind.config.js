/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: '#1e3a8a',
				input: '#1e3a8a',
				ring: '#f97316',
				background: '#000000',
				foreground: '#ffffff',
				primary: {
					DEFAULT: '#1e3a8a',
					foreground: '#ffffff',
				},
				secondary: {
					DEFAULT: '#000000',
					foreground: '#ffffff',
				},
				accent: {
					DEFAULT: '#f97316',
					foreground: '#ffffff',
				},
				destructive: {
					DEFAULT: '#dc2626',
					foreground: '#ffffff',
				},
				muted: {
					DEFAULT: '#1e293b',
					foreground: '#94a3b8',
				},
				popover: {
					DEFAULT: '#0f172a',
					foreground: '#ffffff',
				},
				card: {
					DEFAULT: '#0f172a',
					foreground: '#ffffff',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
