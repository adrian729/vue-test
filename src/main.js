import './index.scss';
import { createApp } from 'vue';
import withUUID from 'vue-uuid';
import App from './App.vue';

const app = withUUID(createApp(App));
app.mount('#app');
