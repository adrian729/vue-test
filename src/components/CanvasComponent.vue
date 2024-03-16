<template>
    <span>Divisions: {{ divisions }}</span>
    <div class="container">
        <canvas :id="canvas_uuid" width="300" height="200"></canvas>
    </div>
    <button @click="increaseDivisions">add</button>
    <button @click="decreaseDivisions">remove</button>
    <button @click="drawRect">Redraw</button>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { uuid } from 'vue-uuid';

const canvas_uuid = uuid.v4();
const canvas = reactive({
    canvasElement: undefined,
    ctx: undefined,
});
const divisions = ref(1);

onMounted(() => {
    canvas.canvasElement = document.getElementById(canvas_uuid);
    canvas.ctx = canvas.canvasElement?.getContext('2d');
    drawRect();
});

const drawRect = () => {
    if (!canvas.ctx) {
        return;
    }

    const canvasWidth = canvas.canvasElement.width;
    const canvasHeight = canvas.canvasElement.height;
    const gapSize = 5;
    const rectsWidthSpace = canvasWidth - gapSize * (divisions.value + 1);
    const rectsHeightSpace = canvasHeight - gapSize * (divisions.value + 1);
    const rectWidth = rectsWidthSpace / divisions.value;
    const rectHeight = rectsHeightSpace / divisions.value;
    const smallRectGap = rectWidth / 10;

    // clear canvas
    canvas.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // draw rect
    for (let i = 0; i < divisions.value; i++) {
        for (let j = 0; j < divisions.value; j++) {
            const rectXStart = i * (rectWidth + gapSize) + gapSize;
            const rectYStart = j * (rectHeight + gapSize) + gapSize;
            canvas.ctx.beginPath();
            canvas.ctx.rect(rectXStart, rectYStart, rectWidth, rectHeight);
            canvas.ctx.stroke();

            if (Math.random() > 0.5) {
                canvas.ctx.beginPath();
                canvas.ctx.rect(
                    rectXStart + smallRectGap,
                    rectYStart + smallRectGap,
                    rectWidth - 2 * smallRectGap,
                    rectHeight - 2 * smallRectGap,
                );
                canvas.ctx.stroke();
            }
        }
    }
};

const increaseDivisions = () => {
    divisions.value += 1;
    drawRect();
};
const decreaseDivisions = () => {
    if (divisions.value <= 1) {
        divisions.value = 1;
        return;
    }
    divisions.value -= 1;
    drawRect();
};
</script>

<style scoped lang="scss">
canvas {
    width: 10rem;
    height: 10rem;
    border: 1px solid black;
}
</style>
