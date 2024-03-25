<template>
    <canvas
        class="w-full border-2 border-accent"
        :id="canvas_uuid"
        :width="width"
        :height="height"
        ref="canvas"
    ></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { degToRad } from '@/utils/mathUtils';
import type {
    CirclesData,
    RectanglesData,
    CanvasItem,
} from '@/components/canvas/types';

import { isCirclesData, isRectanglesData } from '@/components/canvas/types';

const canvas = ref<HTMLCanvasElement | null>(null);
const context = ref<CanvasRenderingContext2D | undefined | null>(null);

type Props = {
    canvas_uuid: string;
    width: number;
    height: number;
    canvasItem: Omit<CanvasItem, 'id'>;
};
const props = withDefaults(defineProps<Props>(), {
    id: 'canvas',
    width: 500,
    height: 500,
    canvasItem: () => ({
        data: {
            num_slices: 1,
            lines: [],
            arcs: [],
        },
        type: 'circles',
    }),
});

onMounted(() => {
    context.value = canvas.value?.getContext('2d');
    draw();
});

watch(
    () => [props.canvasItem],
    () => {
        draw();
    },
    { deep: true },
);

const draw = () => {
    if (!canvas.value || !context.value) {
        return;
    }
    if (!props.canvasItem) {
        return;
    }

    if (isCirclesData(props.canvasItem.data)) {
        drawCircles(
            context.value,
            props.canvasItem.data,
            props.width,
            props.height,
        );
    } else if (isRectanglesData(props.canvasItem.data)) {
        drawRectangles(
            context.value,
            props.canvasItem.data,
            props.width,
            props.height,
        );
    }
};

const drawCircles = (
    context: CanvasRenderingContext2D,
    data: CirclesData,
    width: number,
    height: number,
) => {
    // reset canvas
    context.clearRect(0, 0, width, height);

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'black';

    if (!data?.lines?.length && !data?.arcs?.length) {
        return;
    }
    const cx = 0.5 * width;
    const cy = 0.5 * height;

    const w = 0.01 * width;
    const h = 0.1 * height;
    let x, y;

    const radius = width * 0.3;
    const slice = degToRad(360 / data.num_slices);

    // -- lines
    for (const line of data.lines) {
        const angle = slice * line.idx;

        x = cx + radius * Math.sin(angle);
        y = cy + radius * Math.cos(angle);

        context.save();

        context.translate(x, y);
        context.rotate(-angle);
        context.scale(line.scale.x, line.scale.y);

        context.beginPath();
        context.rect(-0.5 * w, line.rect_h * h, w, h);
        context.fill();

        context.restore();
    }
    // -- arcs
    for (const arc of data.arcs) {
        const angle = slice * arc.idx;

        context.save();

        context.translate(cx, cy);
        context.rotate(-angle);

        context.lineWidth = arc.line_width * width;

        context.beginPath();
        context.arc(
            0,
            0,
            arc.radius * radius,
            slice * arc.start_angle,
            slice * arc.end_angle,
        );
        context.stroke();

        context.restore();
    }
};

const drawRectangles = (
    context: CanvasRenderingContext2D,
    data: RectanglesData,
    width: number,
    height: number,
) => {
    // reset canvas
    context.clearRect(0, 0, width, height);

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    if (!data?.rectangles?.length) {
        return;
    }

    const rectangles = data.rectangles;
    const gap_x = data.gap * width;
    const gap_y = data.gap * height;
    const divisions = data.divisions;

    const w_space = width - gap_x * (divisions + 1);
    const h_space = height - gap_y * (divisions + 1);
    const rect_w = w_space / divisions;
    const rect_h = h_space / divisions;

    const in_gap_x = rect_w * data.in_gap;
    const in_gap_y = rect_h * data.in_gap;

    // draw rects
    context.lineWidth = width * 0.01;
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

        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();
    }
};
</script>
