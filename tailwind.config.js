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
        // Logo blues: royal blue (the lettering and star) and a light periwinkle
        // (the astronaut suit). Navy stays the base for text and dark bars.
        star: '#3D4EDB',
        'star-dark': '#2F3DB5',
        sky: '#9DB8FF',
        accent: '#FFFFFF',
        'accent-hover': '#F1F5F9',
        // Funnel CTA — from client-data/client.config.js brand.accent
        cta: '#F59E0B',
        'cta-hover': '#D97706',
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
