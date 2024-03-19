<template>
    <canvas
        class="w-10rem h-10rem border-2 border-secondary"
        :id="id"
        :width="width"
        :height="height"
        ref="canvas"
    ></canvas>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

const canvas = ref(null);
const context = ref(null);

const props = defineProps({
    id: {
        type: String,
        default: 'canvas',
    },
    width: {
        type: Number,
        default: 500,
    },
    height: {
        type: Number,
        default: 500,
    },
    rectangles: {
        type: Array,
        default: () => [],
    },
});

onMounted(() => {
    context.value = canvas.value?.getContext('2d');
    drawRect();
});

watch(
    () => props.rectangles,
    () => {
        drawRect();
    },
);

const drawRect = () => {
    if (!canvas.value || !context.value) {
        return;
    }

    // reset canvas
    context.value.clearRect(0, 0, props.width, props.height);

    context.value.fillStyle = 'white';
    context.value.fillRect(0, 0, props.width, props.height);

    context.value.lineWidth = props.width * 0.01;
    // draw rects
    for (const rect of props.rectangles) {
        context.value.beginPath();
        context.value.rect(rect.x, rect.y, rect.width, rect.height);
        context.value.stroke();
    }
};
</script>
