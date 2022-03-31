import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Vue3videoPlay from 'vue3-video-play'
import 'vue3-video-play/dist/style.css'

createApp(App).use(router).use(Antd).use(Vue3videoPlay).mount('#app')
