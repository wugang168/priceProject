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
            'device_id=1fdbd086e4a88931e3e49584c5db0f0a; s=ag12smzs2f; bid=f5444b641783287cddad0cb3dc7649ef_ljkwtrl3; remember=1; xq_is_login=1; u=8268767905; xq_a_token=b3c0f6144f8993efbe557431ad51b415af60757f; xqat=b3c0f6144f8993efbe557431ad51b415af60757f; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOjgyNjg3Njc5MDUsImlzcyI6InVjIiwiZXhwIjoxNjkzNDg2MDA1LCJjdG0iOjE2OTA4OTQwMDUyMTUsImNpZCI6ImQ5ZDBuNEFadXAifQ.oLGt4hikMORKBGeOsyrPwxftMetEZ2GKJ5IjOKK5Mwz7LEYyJo92FUxIbE-W_t2czmVVhD3aZZZs-FLqLIviVugBq0dPA6LfBamAQVUWcAgOBuSk6cHuzsJLl_kdW7FA8o2ehYEdjQMBlfunle6ulxJ_fywwWqtD317JsmBhartd28C_CI8t-_MatYM-aeiUcGl5pLJUTbKQaiNpo4DBT0ZOm0Mj-Qf4iMl8RoldBNOGfNRPy0JTLUwDx21T_Oot6N5qj9Yq7WDoGmwZNC7Dyg51eTupg-8U4h9t-p0VWUgUwHxjy3bzDi09YOka5a91d_fgRIQc5URHbNTNMrgKwQ; xq_r_token=5eb9a059ea0c9252f10f9a88d7d2bbb5035a1076; Hm_lvt_1db88642e346389874251b5a1eded6e3=1691244172,1691289025,1691411099,1691496400; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1691496407; acw_tc=0b328f2216914982058205011e11e5583dcb0149a9ece83f8c08bc5e0599e5'
        },
        rewrite: (path) => path.replace(/\/api/, '')
      }
    }
  }
})
