import { createApp } from 'vue'

import './assets/css/nucleo-icons.css'
import './assets/css/nucleo-svg.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import App from './App.vue'
import store from './store'
import router from './router'
import MaterialDashboard from './material-dashboard'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(MaterialDashboard)
app.mount('#app')
