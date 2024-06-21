import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
library.add(fas);
createApp(App).component('font-awesome-icon', FontAwesomeIcon);

createApp(App).use(router).mount('#app')
