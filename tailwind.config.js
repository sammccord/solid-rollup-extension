module.exports = {
  prefix: '!',
  purge: process.env.NODE_ENV === 'production' ? ['./src/**/*.tsx'] : false,
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"IBM XGA-AI 7x15"', 'sans-serif'],
      serif: ['"IBM XGA-AI 12x20"', 'serif'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
