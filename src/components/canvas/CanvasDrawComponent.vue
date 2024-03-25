<template>
    <canvas
        class="w-full border-2 border-accent"
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
    type: {
        type: String,
        default: 'circles',
    },
});

onMounted(() => {
    context.value = canvas.value?.getContext('2d');
    draw();
});

watch(
    () => [props.data, props.type],
    () => {
        draw();
    },
    { deep: true },
);

const draw = () => {
    if (props.type === 'circles') {
        drawCircles();
    } else {
        drawRectangles();
    }
};

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

const drawRectangles = () => {
    if (!canvas.value || !context.value) {
        return;
    }

    // reset canvas
    context.value.clearRect(0, 0, props.width, props.height);

    context.value.fillStyle = 'white';
    context.value.fillRect(0, 0, props.width, props.height);

    if (!props.data?.rectangles?.length) {
        return;
    }

    const rectangles = props.data.rectangles;
    const gap_x = props.data.gap * props.width;
    const gap_y = props.data.gap * props.height;
    const divisions = props.data.divisions;

    const w_space = props.width - gap_x * (divisions + 1);
    const h_space = props.height - gap_y * (divisions + 1);
    const rect_w = w_space / divisions;
    const rect_h = h_space / divisions;

    const in_gap_x = rect_w * props.data.in_gap;
    const in_gap_y = rect_h * props.data.in_gap;

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
