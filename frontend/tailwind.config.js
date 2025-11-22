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
                'glitch': 'glitch 1s linear infinite',
                'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                glitch: {
                    '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
                    '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
                    '62%': { transform: 'translate(0,0) skew(5deg)' },
                },
                'pulse-neon': {
                    '0%, 100%': { opacity: 1, boxShadow: '0 0 5px #00f0ff, 0 0 10px #00f0ff' },
                    '50%': { opacity: .5, boxShadow: '0 0 2px #00f0ff, 0 0 5px #00f0ff' },
                }
            }
        },
    },
    plugins: [],
}
