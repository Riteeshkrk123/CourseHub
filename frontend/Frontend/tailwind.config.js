/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        userBg: "url('./src/assets/hero/user-bg.png')",
        dashboardBanner: "url('./src/assets/dashboard/dashoboardHome/banner.png')",
      },
      boxShadow: {
        one: ['rgba(100, 100, 111, 0.2) 0px 7px 29px 0px']
      }
    },
    fontFamily: {
      roboto: ['"Roboto", serif'],
      heebo: ['"Heebo", serif']
    }
  },
  plugins: [],
}

