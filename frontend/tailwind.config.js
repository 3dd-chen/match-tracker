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
                'cyber-neon-green': '#4bff21',
                'cyber-purple': '#b000ff',
                'cyber-magenta': '#fd00ff',
                'cyber-deep-purple': '#8900ff',
                'cyber-hot-pink': '#ff0677',
                'cyber-blue': '#0051ff',
                'cyber-black': '#050505',
                'cyber-gray': '#1a1a1a',
            },
            fontFamily: {
                sans: ['Rajdhani', 'sans-serif'],
                mono: ['Orbitron', 'monospace'],
            },
            animation: {
                'glitch': 'glitch 3s cubic-bezier(.25, .46, .45, .94) both infinite',
                'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                'glitch': {
                    '0%': {
                        textShadow: '1px 0 #ff003c, -1px 0 #00f0ff',
                    },
                    '5%': {
                        textShadow: '-1px 0 #ff003c, 1px 0 #00f0ff',
                    },
                    '10%': {
                        textShadow: '2.5px 0 #ff003c, -2.5px 0 #00f0ff',
                    },
                    '15%': {
                        textShadow: '-2.5px 0 #ff003c, 2.5px 0 #00f0ff',
                    },
                    '20%, 100%': {
                        textShadow: 'none',
                    }
                },
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
