<template>
    <div>
        <div class="md:grid md:grid-cols-5 md:gap-4">
            <div
                class="bg-slate-50 dark:bg-slate-800 shadow-md p-4 m-4 rounded-xl transition duration-300 hover:shadow-xl"
                v-for="rectangle in data.rectangles"
                :key="rectangle.id"
            >
                <CanvasRectanglesComponent
                    :id="rectangle.id"
                    :width="800"
                    :height="800"
                    :rectanglesData="rectangle.canvasData"
                />
                <div class="px-2 py-4">
                    <h3>Rectangle {{ rectangle.id }}</h3>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
// -- Imports
import { reactive, onMounted } from 'vue';
import axios from 'axios';
// -- Components
import CanvasRectanglesComponent from '@/components/canvas/CanvasRectanglesComponent.vue';

const jsonServerUrl = import.meta.env.VITE_JSON_SERVER_URL;

const data = reactive({
    rectangles: [],
});

onMounted(() => {
    loadRectangles();
});

const loadRectangles = () => {
    axios
        .get(`${jsonServerUrl}/rectangles`)
        .then((response) => {
            data.rectangles = response.data;
        })
        .catch((error) => console.error(error));
};
</script>
