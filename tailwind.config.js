export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        frost: '#F7F9FC',
        ink: '#0F1B2D',
        cool: {
          50: '#EEFBFC',
          100: '#D3F3F6',
          400: '#3CC4D4',
          500: '#0EA5B7',
          600: '#0B8595',
          700: '#096A78',
        },
        ember: {
          50: '#FFF1EA',
          400: '#FF9466',
          500: '#FF7A45',
          600: '#E8602D',
        },
        mist: '#E2E8F0',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        wave: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.5s ease-out forwards',
        wave: 'wave 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
