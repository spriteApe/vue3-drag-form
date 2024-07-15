import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnoCss(),
    AutoImport({
      // 可以自定义文件生成的位置，默认是根目录下，使用ts的建议放src目录下
      dts: './src/types/auto-imports.d.ts',
      imports: ['vue', 'vue-router', 'pinia']
    })
    // Components({
    //   resolvers: [
    //     AntDesignVueResolver({
    //       importStyle: false // css in js
    //     })
    //   ],
    //   dts: './src/types/components.d.ts'
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
