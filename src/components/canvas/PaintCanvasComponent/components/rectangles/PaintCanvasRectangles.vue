<template>
    <div class="flex justify-center py-4">
        <CanvasDrawComponent
            :canvas_uuid="props.canvas_uuid"
            :width="props.width"
            :height="props.height"
            :canvasItem="{ data: rectanglesData, type: 'rectangles' }"
            ref="canvas"
        />
    </div>
    <DividerComponent text="Settings" />
    <PaintCanvasRectanglesSettings
        :divisions="divisions"
        v-model:squareProbability.number="squareProbability"
        v-model:smallSquareProbability.number="smallSquareProbability"
        @updateDivisions="updateDivisions"
        @generateRectangles="generateRectangles"
    />
</template>

<script setup lang="ts">
// -- Imports
import { ref, onBeforeMount } from 'vue';
// -- Components
import DividerComponent from '@/components/DividerComponent.vue';
import CanvasDrawComponent from '@/components/canvas/CanvasDrawComponent.vue';
import PaintCanvasRectanglesSettings from './PaintCanvasRectanglesSettings.vue';
// -- Types
import type {
    RectanglesData,
    RectanglesCanvasItem,
} from '@/components/canvas/types';

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
const divisions = ref<number>(5);
const squareProbability = ref<number>(1.0);
const smallSquareProbability = ref<number>(0.5);
const rectanglesData = ref<RectanglesData>({
    rectangles: [],
    gap: 0.05,
    in_gap: 0.1,
    divisions: 5,
});

const emit = defineEmits({
    updateCanvasData: (canvasData: Omit<RectanglesCanvasItem, 'id'>) =>
        canvasData,
});

onBeforeMount(() => {
    generateRectangles();
});

const generateRectangles = () => {
    rectanglesData.value.rectangles = [];
    rectanglesData.value.gap = 0.05;
    rectanglesData.value.in_gap = 0.1;
    rectanglesData.value.divisions = divisions.value;

    for (let i = 0; i < divisions.value; i++) {
        for (let j = 0; j < divisions.value; j++) {
            if (Math.random() > 1 - squareProbability.value) {
                rectanglesData.value.rectangles.push({
                    x: i,
                    y: j,
                });

                if (Math.random() > 1 - smallSquareProbability.value) {
                    rectanglesData.value.rectangles.push({
                        x: i,
                        y: j,
                        is_in: true,
                    });
                }
            }
        }
    }

    emit('updateCanvasData', {
        data: rectanglesData.value,
        type: 'rectangles',
    });
};

const updateDivisions = (value: number) => {
    divisions.value = value;
    generateRectangles();
};
</script>
