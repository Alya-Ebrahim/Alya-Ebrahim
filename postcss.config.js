// D:/my-project/postcss.config.js

/** @type {import('postcss-load-config').Config} */
export default { // 💡 تم استبدال module.exports بـ export default
  plugins: {
    // نستخدم الآن الحزمة الجديدة ونمرر خيار التجاوز
    '@tailwindcss/postcss': {
      processor: 'css', 
    },
    'autoprefixer': {},
  },
}