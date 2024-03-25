import '@/index.scss';
import { createApp } from 'vue';
import withUUID from 'vue-uuid';
import App from '@/App.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from './router';

const app = withUUID(createApp(App));
// -- Components
app.component('FontAwesomeIcon', FontAwesomeIcon);
// --- End Components
app.use(router);
app.mount('#app');
