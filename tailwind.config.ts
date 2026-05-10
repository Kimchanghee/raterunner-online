import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
