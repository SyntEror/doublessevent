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
                primary: '#FFD700', // Gold
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
    plugins: [tailwind_scrollbar],
} satisfies Config
