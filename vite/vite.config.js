import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import testHookPlugin from './plugins/testHookPlugin'
import virtualFibModulePlugin from './plugins/virtual-module'
import svgr from './plugins/svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), /* testHookPlugin() */, virtualFibModulePlugin(), svgr() ]
})
