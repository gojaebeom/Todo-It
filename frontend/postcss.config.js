// module.exports = {
//   plugins: {
//     '@tailwindcss/jit': {},
//     autoprefixer: {},
//   },
// }
// postcss.config.js
module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer')],
}
