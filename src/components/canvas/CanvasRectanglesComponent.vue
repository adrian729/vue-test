<template>
    <canvas
        class="w-full border-2 border-secondary"
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
        type: [Number, String],
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
    rectanglesData: {
        type: Object,
        default: () => ({
            rectangles: [],
            gap: 0.05,
            in_gap: 0.1,
            divisions: 1,
        }),
    },
});

onMounted(() => {
    context.value = canvas.value?.getContext('2d');
    drawRect();
});

watch(
    () => props.rectanglesData,
    () => {
        drawRect();
    },
    { deep: true },
);

const drawRect = () => {
    if (!canvas.value || !context.value) {
        return;
    }

    // reset canvas
    context.value.clearRect(0, 0, props.width, props.height);

    context.value.fillStyle = 'white';
    context.value.fillRect(0, 0, props.width, props.height);

    if (!props.rectanglesData?.rectangles?.length) {
        return;
    }

    const rectangles = props.rectanglesData.rectangles;
    const gap_x = props.rectanglesData.gap * props.width;
    const gap_y = props.rectanglesData.gap * props.height;
    const divisions = props.rectanglesData.divisions;

    const w_space = props.width - gap_x * (divisions + 1);
    const h_space = props.height - gap_y * (divisions + 1);
    const rect_w = w_space / divisions;
    const rect_h = h_space / divisions;

    const in_gap_x = rect_w * props.rectanglesData.in_gap;
    const in_gap_y = rect_h * props.rectanglesData.in_gap;

    // draw rects
    context.value.lineWidth = props.width * 0.01;
    for (const rect of rectangles) {
        let x = rect.x * (rect_w + gap_x) + gap_x;
        let y = rect.y * (rect_h + gap_y) + gap_y;
        let w = rect_w;
        let h = rect_h;

        if (rect.is_in) {
            x += in_gap_x;
            y += in_gap_y;
            w -= 2 * in_gap_x;
            h -= 2 * in_gap_y;
        }

        context.value.beginPath();
        context.value.rect(x, y, w, h);
        context.value.stroke();
    }
};
</script>
