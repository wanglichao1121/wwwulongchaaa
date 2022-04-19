import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@corgicoding/theme/dist/normalize.css";
import "@corgicoding/theme/dist/github.css";
import "@corgicoding/theme";
import './prism.css'
import 'animate.css';

createApp(App).use(router).mount('#app')
