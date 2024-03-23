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
import { degToRad } from '@/utils/mathUtils.js';

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
    data: {
        type: Object,
        default: () => ({}),
    },
});

onMounted(() => {
    context.value = canvas.value?.getContext('2d');
    drawCircles();
});

watch(
    () => props.data,
    () => {
        drawCircles();
    },
    { deep: true },
);

const drawCircles = () => {
    if (!canvas.value || !context.value) {
        return;
    }

    // reset canvas
    context.value.clearRect(0, 0, props.width, props.height);

    context.value.fillStyle = 'white';
    context.value.fillRect(0, 0, props.width, props.height);
    context.value.fillStyle = 'black';

    if (!props.data?.lines?.length && !props.data?.arcs?.length) {
        return;
    }
    const cx = 0.5 * props.width;
    const cy = 0.5 * props.height;

    const w = 0.01 * props.width;
    const h = 0.1 * props.height;
    let x, y;

    const radius = props.width * 0.3;
    const slice = degToRad(360 / props.data.num_slices);

    /*
    {
        num_slices: (2, 2000) <-- settings: check how to do log scale slider
        lines: { < -- settings: Line Probability
            idx,
            scale: {x, y},
            rect_h,

        },
        arcs: { < -- settings: Arc Probability
            idx,
            lineWidth,
            radius,
            startAngle,
            endAngle,
        }
    }
    */
    // -- lines
    for (const line of props.data.lines) {
        const angle = slice * line.idx;

        x = cx + radius * Math.sin(angle);
        y = cy + radius * Math.cos(angle);

        context.value.save();

        context.value.translate(x, y);
        context.value.rotate(-angle);
        context.value.scale(line.scale.x, line.scale.y);

        context.value.beginPath();
        context.value.rect(-0.5 * w, line.rect_h * h, w, h);
        context.value.fill();

        context.value.restore();
    }
    // -- arcs
    for (const arc of props.data.arcs) {
        const angle = slice * arc.idx;

        context.value.save();

        context.value.translate(cx, cy);
        context.value.rotate(-angle);

        context.value.lineWidth = arc.lineWidth * props.width;

        context.value.beginPath();
        context.value.arc(
            0,
            0,
            arc.radius * radius,
            slice * arc.startAngle,
            slice * arc.endAngle,
        );
        context.value.stroke();

        context.value.restore();
    }
};
</script>
