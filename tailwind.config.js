/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B1547',
        'primary-light': '#1a2a6b',
        accent: '#FFFFFF',
        'accent-hover': '#F1F5F9',
        'bg-light': '#FFFFFF',
        'bg-alt': '#F8FAFC',
        'bg-dark': '#0B1547',
        'text-dark': '#1E293B',
        'text-muted': '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
