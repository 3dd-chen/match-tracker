/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'cyber-yellow': '#fcee0a',
                'cyber-cyan': '#00f0ff',
                'cyber-pink': '#ff003c',
                'cyber-black': '#050505',
                'cyber-gray': '#1a1a1a',
            },
            fontFamily: {
                sans: ['Rajdhani', 'sans-serif'],
                mono: ['Orbitron', 'monospace'],
            },
            animation: {
                'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                'pulse-neon': {
                    '0%': {
                        opacity: 1,
                        boxShadow: '0 0 20px rgba(255,0,60,0.8), 0 0 40px rgba(255,0,60,0.4)'
                    },
                    '50%': {
                        opacity: 0.7,
                        boxShadow: '0 0 10px rgba(255,0,60,0.4), 0 0 20px rgba(255,0,60,0.2)'
                    },
                    '100%': {
                        opacity: 1,
                        boxShadow: '0 0 20px rgba(255,0,60,0.8), 0 0 40px rgba(255,0,60,0.4)'
                    },
                }
            }
        },
    },
    plugins: [],
}
