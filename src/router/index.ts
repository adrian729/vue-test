import { createWebHistory, createRouter } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import CanvasListPage from '@/pages/CanvasListPage.vue';
import ThemePage from '@/pages/ThemePage.vue';
import PaintCanvasPage from '@/pages/PaintCanvasPage.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/canvas', component: PaintCanvasPage },
    { path: '/canvas-list', component: CanvasListPage },
    { path: '/theme', component: ThemePage },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// console.log('url', window.location.host); // to get the host name and port (for example: localhost:8080)

export default router;
