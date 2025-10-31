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
				// Cores do Logotipo P3ZERO
				p3zero: {
					black: '#000000',
					white: '#FFFFFF',
					gray: '#333333',
					blue: '#00BFFF',
					green: '#7CFC00',
					orange: '#FF4500',
				},
				// Cores do sistema
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#FF4500', // Laranja vibrante para CTAs
					foreground: '#FFFFFF',
				},
				secondary: {
					DEFAULT: '#00BFFF', // Azul elétrico
					foreground: '#FFFFFF',
				},
				accent: {
					DEFAULT: '#7CFC00', // Verde limão
					foreground: '#000000',
				},
				neutral: {
					50: '#FAFAFA',
					100: '#F5F5F5',
					200: '#E5E5E5',
					300: '#D4D4D4',
					400: '#A3A3A3',
					500: '#737373',
					600: '#525252',
					700: '#404040',
					800: '#262626',
					900: '#171717',
					950: '#0A0A0A',
				},
				destructive: {
					DEFAULT: '#EF4444',
					foreground: '#FFFFFF',
				},
				muted: {
					DEFAULT: '#F5F5F5',
					foreground: '#737373',
				},
				popover: {
					DEFAULT: '#FFFFFF',
					foreground: '#171717',
				},
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#171717',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			fontFamily: {
				'p3zero': ['Inter', 'system-ui', 'sans-serif'],
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
				'fade-in': {
					from: { opacity: 0, transform: 'translateY(20px)' },
					to: { opacity: 1, transform: 'translateY(0)' },
				},
				'slide-in-left': {
					from: { opacity: 0, transform: 'translateX(-30px)' },
					to: { opacity: 1, transform: 'translateX(0)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-in-left': 'slide-in-left 0.6s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}