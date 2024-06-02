// import './assets/main.css'
import '../src/assets/global.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)



// Global error handler
app.config.errorHandler = (err, vm, info) => {
    // Custom error handling logic
    console.error('Global Error:', err, info);
    router.push('/error')
  };

app.mount('#app')
