module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nav-text-hover': '#FD4717'
      },
      backgroundSize: {
        '100': "100% 100%",
        '80': "80% 100%"
      }
    },
    fontFamily: {
      'body': ["eczar"]
    }
  },
  plugins: [],
}
