import { createApp } from 'vue'
import './style/general.scss'
import * as bootstrap from 'bootstrap'
import App from './App.vue'
import { router } from './router'
import '@fortawesome/fontawesome-free/css/all.min.css';

createApp(App).use(router).mount('#app')
