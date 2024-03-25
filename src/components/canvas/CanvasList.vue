<template>
    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-4"
    >
        <div
            class="bg-dim-surface text-on-surface shadow shadow-accent p-4 m-4 rounded-xl transition duration-300 hover:shadow-lg hover:shadow-accent cursor-pointer"
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
import { reactive, onMounted } from 'vue';
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
</script>
