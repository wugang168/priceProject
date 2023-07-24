import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { Server } from 'node:http'
// import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://stock.xueqiu.com/',
        secure: true,
        changeOrigin: true,
        headers: {
          cookie:
            'device_id=3d92418d54145740afe48b845e6a2dc3; s=c9128i77cm; remember=1; xq_is_login=1; u=8268767905; bid=f5444b641783287cddad0cb3dc7649ef_lk0h6ok3; xq_a_token=bd4b31e46ca0efd3069bf1bac5c93a214016eb79; xqat=bd4b31e46ca0efd3069bf1bac5c93a214016eb79; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOjgyNjg3Njc5MDUsImlzcyI6InVjIiwiZXhwIjoxNjkyMTUyNTgxLCJjdG0iOjE2ODk1NjA1ODE1MTksImNpZCI6ImQ5ZDBuNEFadXAifQ.L7cC66cM_yqn3A5Ndd95U7ipEhFcFpHbVTO-3_175lsRQzY1yFiaJ6AByF9su_QMMIHvu4edhrapRHfpfDIyVtB3UX8vVJKhf5sqFGILIPQ_jR7QSsJFK5kMn8ykrvCF-K0lmHvtDs2y4Ex4qiGLV2HknmRgnxrg3PIPbSlSWVI1OIKhWztjzC_Oj8LJS8Sqg9zhBZZJTAz8UmpBI3Pu4QFv5JIOL4JbvQ-ZtpYk48xkioMwbjyehfbXJxbeVl4jCBN9-NFJZFNFQYRiTjazY1wFSL0WmF5Viqx8SxtxOizpGj3Y_pTDiQ7ATseDqSjBPzVJWaqf0M6Qeq6_tH4uAg; xq_r_token=a47f7d8965d715cb019dff24aca6e166c5db2ea3; Hm_lvt_1db88642e346389874251b5a1eded6e3=1689729384,1689816173,1689902458,1690161884; is_overseas=0; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1690182893'
        },
        rewrite: (path) => path.replace(/\/api/, '')
      }
    }
  }
})
