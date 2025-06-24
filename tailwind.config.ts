/** @type {import('tailwindcss').Config} */
import tailwind_scrollbar from 'tailwind-scrollbar'
import { type Config } from 'tailwindcss'

export default {
    darkMode: 'class',
    content: ['./src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            zIndex: {
                '-10': '-10',
            },
            colors: {
                primary: '#5DA1FF',
                galaxy: { 50: '#1b1e2b', 100: '#11131d' },
            },
            fontFamily: { sans: ['Inter', 'sans-serif'] },
            keyframes: {
                swirl: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
            animation: { swirl: 'swirl 60s linear infinite' },
        },
    },
    plugins: [tailwind_scrollbar],
} satisfies Config
