import { createWebHistory, createRouter } from 'vue-router';
import PaintCanvasComponent from '@/components/canvas/paint-canvas-component/PaintCanvasComponent.vue';

const routes = [
    { path: '/', component: PaintCanvasComponent },
    { path: '/vue-test/', component: PaintCanvasComponent },
    { path: '/vue-test/canvas', component: PaintCanvasComponent },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
