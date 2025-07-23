import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/css/custom.css'
import './assets/css/nucleo-icons.css'
import './assets/css/nucleo-svg.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import App from './App.vue'
import router from './router'
import MaterialDashboard from './material-dashboard'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia);
app.use(router)
app.use(MaterialDashboard)
app.mount('#app')
