/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-up": {
          "0%": {
            "opacity": "0",
            "transform": "translateY(20px)"
        },
        "100%": {
            "opacity": "1",
            "transform": "translateY(0)"
        }
        },
        "delete-up": {
          "0%": {
            "opacity": "1",
            "transform": "translateX(0p)"
          },
          "100%": {
            "opacity": "0",
            "transform": "translateX(30px)"
          }
        },
        "slide-in": {
          "0%": {
            "opacity": "0",
            "transform": "translateX(-20px)"
          },
          "100%": {
            "opacity": "1",
            "transform": "translateX(0)"
          }
        },
        "slide-down": {
          "0%": {
            "opacity": "0",
            "transform": "translateY(-20px)"
          },
          "100%": {
            "opacity": "1",
            "transform": "translateY(0)"
          }
        }
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease',
        'slide-in': 'slide-in 0.5s ease',
        'slide-down': 'slide-down 0.5s ease',
        'delete-up': 'delete-up 0.3s ease-out'
      }
    },
  },
  plugins: [],
}

