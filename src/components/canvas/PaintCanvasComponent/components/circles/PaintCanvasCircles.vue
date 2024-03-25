<template>
    <div class="flex justify-center py-4">
        <CanvasDrawComponent
            :canvas_uuid="props.canvas_uuid"
            :width="props.width"
            :height="props.height"
            :canvasItem="{ data: circlesData, type: 'circles' }"
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

<script setup lang="ts">
// -- Imports
import { ref, computed, onBeforeMount } from 'vue';
import { randomRange, valueToLog } from '@/utils/mathUtils';
// -- Components
import CanvasDrawComponent from '@/components/canvas/CanvasDrawComponent.vue';
import PaintCanvasCirclesSettings from './PaintCanvasCirclesSettings.vue';
import DividerComponent from '@/components/DividerComponent.vue';
// -- Types
import type { CirclesData, CirclesCanvasItem } from '@/components/canvas/types';

interface Props {
    canvas_uuid: string;
    width?: number;
    height?: number;
}
const props = withDefaults(defineProps<Props>(), {
    width: 1080,
    height: 1080,
});

// keep same aspect ratio as in css
const numSlicesLog = ref<number>(50);
const numSlices = computed<number>(() =>
    Math.ceil(valueToLog(numSlicesLog.value, 0, 100, 1, 2000)),
);
const linesProbability = ref<number>(0.7);
const arcsProbability = ref<number>(0.5);
const circlesData = ref<CirclesData>({
    num_slices: 40,
    lines: [],
    arcs: [],
});

const emit = defineEmits({
    updateCanvasData: (canvasData: Omit<CirclesCanvasItem, 'id'>) => canvasData,
});

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
                line_width: randomRange(0.01, 0.03),
                radius: randomRange(0.7, 1.3),
                start_angle: randomRange(-8, 1),
                end_angle: randomRange(1, 5),
            });
        }
    }

    emit('updateCanvasData', { data: circlesData.value, type: 'circles' });
};
</script>
