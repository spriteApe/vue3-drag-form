// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'virtual:uno.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import optionDataConfig from '@/components/optionDataConfig.vue'
import tableColumnsConfig from '@/components/tableColumnsConfig.vue'
import tableDataSourceConfig from '@/components/tableDataSourceConfig.vue'
import visibleConfig from '@/components/visibleConfig/index.vue'
import requiredConfig from '@/components/requiredConfig.vue'
import formLabelConfig from '@/components/formLabelConfig.vue'
const app = createApp(App)
app.component('optionDataConfig', optionDataConfig)
app.component('tableColumnsConfig', tableColumnsConfig)
app.component('tableDataSourceConfig', tableDataSourceConfig)
app.component('visibleConfig', visibleConfig)
app.component('requiredConfig', requiredConfig)
app.component('formLabelConfig', formLabelConfig)
app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
