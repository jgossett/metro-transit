import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue'
import './index.css'

const routes = [
    {
        path: '/',
        component: () => import("@/components/RealTimeDepartures.vue")
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App);
app.use(router)


app.mount('#app');


