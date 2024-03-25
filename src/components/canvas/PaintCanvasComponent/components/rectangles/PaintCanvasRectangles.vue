<template>
    <div class="flex justify-center py-4">
        <CanvasDrawComponent
            :id="props.canvas_uuid"
            :width="props.width"
            :height="props.height"
            :data="rectanglesData"
            type="rectangles"
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

<script setup>
import { ref, onBeforeMount } from 'vue';
import CanvasDrawComponent from '@/components/canvas/CanvasDrawComponent.vue';
import PaintCanvasRectanglesSettings from './PaintCanvasRectanglesSettings.vue';
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
const divisions = ref(5);
const squareProbability = ref(1.0);
const smallSquareProbability = ref(0.5);
const rectanglesData = ref({
    rectangles: [], // list of rectInfo { x, y, is_in }
    gap: 0.05,
    in_gap: 0.1,
    divisions: 5,
});

const emit = defineEmits(['updateCanvasData']);

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

const updateDivisions = (value) => {
    divisions.value = value;
    generateRectangles();
};
</script>
