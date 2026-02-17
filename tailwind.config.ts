import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          hover: '#4F46E5',
          light: '#A5B4FC',
        },
        secondary: {
          DEFAULT: '#06B6D4',
          hover: '#0891B2',
        },
        accent: {
          purple: '#8B5CF6',
          pink: '#EC4899',
          orange: '#F97316',
        },
        dark: {
          DEFAULT: '#0F172A',
          light: '#1E293B',
          lighter: '#334155',
        },
        gray: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        success: '#10B981',
        error: '#EF4444',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        'display': ['72px', { lineHeight: '1.1', fontWeight: '800' }],
        'h1-mobile': ['32px', { lineHeight: '1.2', fontWeight: '800' }],
        'h1-desktop': ['56px', { lineHeight: '1.1', fontWeight: '800' }],
        'h2-mobile': ['28px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2-desktop': ['42px', { lineHeight: '1.2', fontWeight: '700' }],
        'h3-mobile': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'h3-desktop': ['28px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-mobile': ['16px', { lineHeight: '1.7', fontWeight: '400' }],
        'body-desktop': ['18px', { lineHeight: '1.7', fontWeight: '400' }],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
    },
  },
  plugins: [],
}
export default config
