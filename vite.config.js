// vite.config.js (النسخة النظيفة)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 💡 إزالة قسم 'css' بالكامل
});