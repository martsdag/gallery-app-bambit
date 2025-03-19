import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import App from '@/App.vue';
import '@/assets/styles/index.css';
import 'element-plus/dist/index.css';

const app = createApp(App);

app.use(createPinia());
app.use(ElementPlus);

app.mount('#app');
