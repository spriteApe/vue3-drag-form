// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'virtual:uno.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import optionDataConfig from '@/components/optionDataConfig.vue'

const app = createApp(App)
app.component('optionDataConfig', optionDataConfig)
app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
