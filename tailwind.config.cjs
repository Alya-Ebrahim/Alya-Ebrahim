// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html,css}",
  ],
  theme: {
    extend: {
      // 1. ✍️ تخصيص الخط العربي (يجب استيراد الخط في ملف index.css)
      fontFamily: {
        // يمكن تغيير اسم الخط هنا (مثل 'Almarai', 'Changa')
        'sans': ['Cairo', 'Arial', 'sans-serif'], 
      },

      // 2. 🟦 تخصيص الألوان الأساسية للـ Branding والـ UI
      colors: {
        // استخدام اللون الأساسي (Primary) للتبويبات والأزرار الرئيسية
        primary: {
          50: '#F0F8FF', // فاتح جداً للخلفيات
          100: '#E0F3FF', 
          500: '#007BFF', // لون أزرق نقي للتفاعل
          600: '#0069D9', // أزرق داكن (Navy) للحواف والعناوين القوية
          700: '#0056B3',
          900: '#002D62', // كحلي عميق للخلفيات المميزة
        },
        // استخدام لون ثانوي (Accent) للتمييز
        accent: {
          400: '#1D92F3', // سماوي فاتح
          600: '#0863A2', // سماوي داكن
        },
        // توحيد لون النجاح
        success: '#28A745',
        // توحيد لون التحذير/التعطيل
        danger: '#DC3545', 
      },

      // 3. ✨ تخصيص الظلال لتحسين العمق (Elevation)
      boxShadow: {
        'strong': '0 10px 30px -5px rgba(0, 0, 0, 0.15)', // ظل أقوى للوحة الإعدادات الرئيسية
        'inner-t': 'inset 0 4px 6px -1px rgba(0, 0, 0, 0.05)', // ظل داخلي خفيف للتبويبات النشطة
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      // هذا الخيار مهم لحل مشكلة lightningcss
      processor: 'css',
    }),
  ],
}