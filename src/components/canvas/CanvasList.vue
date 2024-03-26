<template>
    <div :class="listContainerClass">
        <div
            :class="itemContainerClass"
            v-for="canvas in data.canvas"
            :key="canvas.id"
        >
            <CanvasDrawComponent
                :canvas_uuid="canvas.id.toString()"
                :width="800"
                :height="800"
                :canvasItem="canvas"
            />
            <div class="px-2 py-4">
                <h3>Canvas {{ canvas.id }}</h3>
                <span>type: {{ canvas.type }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
// -- Imports
import { reactive, onMounted, normalizeClass } from 'vue';
import axios from 'axios';
// -- Components
import CanvasDrawComponent from '@/components/canvas/CanvasDrawComponent.vue';
// -- Types
import type { CanvasItem } from '@/components/canvas/types';

const jsonServerUrl = import.meta.env.VITE_JSON_SERVER_URL;

interface Data {
    canvas: CanvasItem[];
}
const data = reactive<Data>({
    canvas: [],
});

onMounted(() => {
    loadCanvas();
});

const loadCanvas = () => {
    axios
        .get(`${jsonServerUrl}/canvas`)
        .then((response) => {
            data.canvas = response.data;
        })
        .catch((error) => console.error(error));
};

const listContainerClass = normalizeClass([
    'grid gap-1',
    'grid-cols-1',
    'sm:grid-cols-2',
    'md:grid-cols-3',
    'lg:grid-cols-4',
    'xl:grid-cols-5',
]);

const itemContainerClass = normalizeClass([
    'bg-dim-surface text-on-surface cursor-pointer',
    'p-4 w-full',
    'shadow shadow-accent',
    'transition duration-200 hover:shadow-lg hover:shadow-accent hover:z-50 hover:scale-105',
    'md:hover:scale-110',
]);
</script>
