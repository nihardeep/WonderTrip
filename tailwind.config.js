/** @type {import('tailwindcss').Config} */

export default {

  content: [

    "./index.html",

    "./src/**/*.{js,ts,jsx,tsx}",

  ],

  theme: {

    extend: {

      colors: {

        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },

        accent: {

          50: '#fef3c7',

          100: '#fde68a',

          200: '#fcd34d',

          300: '#fbbf24',

          400: '#f59e0b',

          500: '#d97706',

          600: '#b45309',

          700: '#92400e',

          800: '#78350f',

          900: '#451a03',

        }

      },

      fontFamily: {

        sans: ['Inter', 'system-ui', 'sans-serif'],

        display: ['Poppins', 'sans-serif'],

      },

      boxShadow: {

        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',

        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

      },

      animation: {

        'fade-in': 'fadeIn 0.5s ease-in-out',

        'slide-up': 'slideUp 0.5s ease-out',

        'slide-down': 'slideDown 0.5s ease-out',

      },

      keyframes: {

        fadeIn: {

          '0%': { opacity: '0' },

          '100%': { opacity: '1' },

        },

        slideUp: {

          '0%': { transform: 'translateY(20px)', opacity: '0' },

          '100%': { transform: 'translateY(0)', opacity: '1' },

        },

        slideDown: {

          '0%': { transform: 'translateY(-20px)', opacity: '0' },

          '100%': { transform: 'translateY(0)', opacity: '1' },

        },

      },

    },

  },

  plugins: [],

}
