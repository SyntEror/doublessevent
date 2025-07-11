/** @type {import('tailwindcss').Config} */
import tailwind_scrollbar from 'tailwind-scrollbar'
import { type Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
    darkMode: 'class',
    content: ['./src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            zIndex: {
                '-10': '-10',
            },
            colors: {
                primary: '#EE424B', // Red
                secondary: '#F5E6E8', // Powder Pink
                dark: '#1F1F1F', // Black
            },
            fontFamily: {
                playfair: ['Playfair Display', 'serif'],
                inter: ['Inter', 'sans-serif'],
            },
            keyframes: {
                swirl: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
            animation: { swirl: 'swirl 60s linear infinite' },
        },
    },
    plugins: [
        tailwind_scrollbar,
        plugin(({ addUtilities }) => {
            addUtilities({
                '.perspective-1000': { perspective: '1000px' },
                '.preserve-3d': { transformStyle: 'preserve-3d' },
                '.backface-hidden': { backfaceVisibility: 'hidden' },
            })
        }),
    ],
} satisfies Config
