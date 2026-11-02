import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          50: '#F4F2FA',
          100: '#E7E4F5',
          200: '#C9C2E8',
          300: '#A79CD8',
          400: '#7563BD',
          500: '#4D369D',
          600: '#3C2882',
          700: '#2B1B5E', // Brand Primary
          800: '#211448',
          900: '#170D33',
          950: '#0E0820',
        },
        saffron: {
          50: '#FEF8EC',
          100: '#FDF0CE',
          200: '#FCE09D',
          300: '#FACF6C',
          400: '#F7BC3C',
          500: '#F2A31B', // Brand Accent Saffron/Gold
          600: '#D9890C',
          700: '#B06B07',
          800: '#8A520B',
          900: '#71420C',
          950: '#412204',
        },
        sand: {
          50: '#FBF7F0', // Brand Warm Off-White
          100: '#F5ECE0',
          200: '#EBDDC9',
          300: '#DFCBB1',
          400: '#CEB18C',
          500: '#BA9469',
          600: '#A67E55',
          700: '#856243',
          800: '#6D5039',
          900: '#584231',
          950: '#302218',
        },
        maroon: {
          50: '#FBF2F4',
          100: '#F6E4E8',
          200: '#EFC9D2',
          300: '#E4A2B2',
          400: '#D36F8B',
          500: '#BF4467',
          600: '#A62E52',
          700: '#8B1E3F',
          800: '#741B37',
          900: '#631B32',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'lotus-pattern': "radial-gradient(#F2A31B15 1px, transparent 1px)",
      },
      boxShadow: {
        'dakshata': '0 4px 20px -2px rgba(43, 27, 94, 0.08), 0 2px 6px -1px rgba(43, 27, 94, 0.04)',
        'dakshata-hover': '0 12px 30px -4px rgba(43, 27, 94, 0.16), 0 4px 12px -2px rgba(43, 27, 94, 0.08)',
        'gold-glow': '0 0 25px rgba(242, 163, 27, 0.35)',
      }
    },
  },
  plugins: [],
};
export default config;
