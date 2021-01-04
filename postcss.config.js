// postcss.config.js
const production = process.env.NODE_ENV === 'production'

module.exports = {
  minimize: production,
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    production && cssnano(),
  ],
}
