<template>
    <div class="flex flex-col m-2">
        <div class="flex justify-between items-center py-4">
            <h1 class="font-bold text-xl">Paint Canvas</h1>
            <button class="btn-gray">
                <FontAwesomeIcon :icon="faDownload" @click="downloadCanvas" />
            </button>
        </div>
        <DividerComponent text="Settings" />
        <div class="flex justify-center py-4">
            <CanvasRectanglesComponent
                :id="canvas_uuid"
                :width="dimensions.width"
                :height="dimensions.height"
                :rectangles="rectangles"
                ref="canvas"
            />
        </div>
        <div>
            <DividerComponent text="Settings" />
            <div class="py-4 flex justify-center gap-1">
                <button class="btn-gray" @click="decreaseDivisions">
                    <FontAwesomeIcon :icon="faMinus" />
                </button>
                <button class="btn-gray" @click="generateRectangles">
                    Redraw
                </button>
                <button class="btn-gray" @click="increaseDivisions">
                    <FontAwesomeIcon :icon="faPlus" />
                </button>
            </div>
            <label
                for="square-probability-range"
                class="block mb-2 text-sm font-medium"
            >
                Squares Probability: {{ squareProbability }}
            </label>
            <div class="flex items-center gap-2">
                <span>0</span>
                <input
                    id="square-probability-range"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    class="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                    v-model="squareProbability"
                />
                <span>1</span>
            </div>
            <label
                for="small-square-probability-range"
                class="block mb-2 text-sm font-medium"
            >
                Small Squares Probability: {{ smallSquareProbability }}
            </label>
            <div class="flex items-center gap-2">
                <span>0</span>
                <input
                    id="small-square-probability-range"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    class="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                    v-model="smallSquareProbability"
                />
                <span>1</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { uuid } from 'vue-uuid';
import { faPlus, faMinus, faDownload } from '@fortawesome/free-solid-svg-icons';
import { ref, onBeforeMount } from 'vue';
import CanvasRectanglesComponent from '@/components/canvas/CanvasRectanglesComponent.vue';
import DividerComponent from '@/components/DividerComponent.vue';

const canvas_uuid = uuid.v4();
const dimensions = ref({ width: 200, height: 200 }); // keep same aspect ratio as in css
const divisions = ref(5);
const squareProbability = ref(1.0);
const smallSquareProbability = ref(0.5);
const rectangles = ref([]);

onBeforeMount(() => {
    generateRectangles();
});

const generateRectangles = () => {
    rectangles.value = [];

    const w = dimensions.value.width;
    const h = dimensions.value.height;
    const gap = w * 0.05;
    const w_gaps_size = w - gap * (divisions.value + 1);
    const h_gaps_size = h - gap * (divisions.value + 1);
    const rectWidth = w_gaps_size / divisions.value;
    const rectHeight = h_gaps_size / divisions.value;
    const in_gap = rectWidth * 0.1;

    for (let i = 0; i < divisions.value; i++) {
        for (let j = 0; j < divisions.value; j++) {
            if (Math.random() > 1 - squareProbability.value) {
                const rectXStart = i * (rectWidth + gap) + gap;
                const rectYStart = j * (rectHeight + gap) + gap;
                rectangles.value.push({
                    x: rectXStart,
                    y: rectYStart,
                    width: rectWidth,
                    height: rectHeight,
                });

                if (Math.random() > 1 - smallSquareProbability.value) {
                    rectangles.value.push({
                        x: rectXStart + in_gap,
                        y: rectYStart + in_gap,
                        width: rectWidth - 2 * in_gap,
                        height: rectHeight - 2 * in_gap,
                    });
                }
            }
        }
    }
};

const increaseDivisions = () => {
    if (divisions.value >= 30) {
        divisions.value = 30;
        return;
    }
    divisions.value += 1;
    generateRectangles();
};

const decreaseDivisions = () => {
    if (divisions.value <= 1) {
        divisions.value = 1;
        return;
    }
    divisions.value -= 1;
    generateRectangles();
};

const downloadCanvas = () => {
    const canvasElement = document.getElementById(canvas_uuid);
    if (!canvasElement) {
        return;
    }
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = canvasElement.toDataURL();
    link.click();
};
</script>
