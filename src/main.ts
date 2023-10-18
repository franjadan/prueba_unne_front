import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/main.scss";

router.beforeEach((to, from, next) => {
    
    //Cambio el título de las páginas

    document.title = to.meta.title as string;
    next();
});

createApp(App).use(router).mount('#app')
