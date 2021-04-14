import { createApp } from 'vue'
import App from './components/App.vue'
import { store, key } from './store/store'
import router from './router/router'
import './styles/index.scss'

const app = createApp(App);
app.use(store, key)
app.use(router)
app.mount('#app')
