<template>
    <div class="flex justify-center py-4">
        <CanvasCirclesComponent
            :id="props.canvas_uuid"
            :width="props.width"
            :height="props.height"
            :data="circlesData"
            ref="canvas"
        />
    </div>
    <DividerComponent text="Settings" />
    <PaintCanvasCirclesSettings
        v-model:numSlicesLog.number="numSlicesLog"
        v-model:linesProbability.number="linesProbability"
        v-model:arcsProbability.number="arcsProbability"
        @generateCircles="generateCircles"
    />
</template>

<script setup>
// -- Imports
import { ref, computed, onBeforeMount } from 'vue';
import { randomRange, valueToLog } from '@/utils/mathUtils.js';
// -- Components
import CanvasCirclesComponent from '@/components/canvas/CanvasCirclesComponent.vue';
import PaintCanvasCirclesSettings from './PaintCanvasCirclesSettings.vue';
import DividerComponent from '@/components/DividerComponent.vue';

const props = defineProps({
    canvas_uuid: {
        type: String,
        required: true,
    },
    width: {
        type: Number,
        default: 1080,
    },
    height: {
        type: Number,
        default: 1080,
    },
});

// keep same aspect ratio as in css
const numSlicesLog = ref(10);
const numSlices = computed(() => {
    console.log('update numSlices');
    return Math.ceil(valueToLog(numSlicesLog.value, 0, 100, 1, 2000));
});
const linesProbability = ref(1.0);
const arcsProbability = ref(1.0);
const circlesData = ref({
    num_slices: 40,
    lines: [], // list of rectInfo { idx, scale: {x, y}, rect_h }
    arcs: [], // list of arcInfo { idx, lineWidth, radius, startAngle, endAngle }
});

const emit = defineEmits(['updateCanvasData']);

onBeforeMount(() => {
    generateCircles();
});

const generateCircles = () => {
    circlesData.value.lines = [];
    circlesData.value.arcs = [];
    circlesData.value.num_slices = numSlices.value;

    for (let i = 0; i < numSlices.value; i++) {
        if (Math.random() > 1 - linesProbability.value) {
            circlesData.value.lines.push({
                idx: i,
                scale: {
                    x: randomRange(0.1, 2),
                    y: randomRange(0.2, 0.5),
                },
                rect_h: randomRange(0, -0.5),
            });
        }
        if (Math.random() > 1 - arcsProbability.value) {
            circlesData.value.arcs.push({
                idx: i,
                lineWidth: randomRange(0.01, 0.03),
                radius: randomRange(0.7, 1.3),
                startAngle: randomRange(-8, 1),
                endAngle: randomRange(1, 5),
            });
        }
    }

    emit('updateCanvasData', {
        data: circlesData.value,
        type: 'circles',
    });
};
</script>
