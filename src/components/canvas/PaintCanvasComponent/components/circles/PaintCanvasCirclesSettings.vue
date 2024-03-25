<template>
    <div class="flex flex-col px-10 gap-2">
        <div>
            <label
                for="num-slices-range"
                class="block mb-2 text-sm font-medium"
            >
                Number of Slices:
                {{ numSlices }}
            </label>
            <div class="flex items-center gap-2">
                <span class="w-[1ch]"></span>
                <input
                    id="lines-probability-range"
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    :class="rangeInputClass"
                    v-model="numSlicesLog"
                    @change="generateCircles"
                />
                <span class="w-[1ch]"></span>
            </div>
        </div>
        <div>
            <label
                for="lines-probability-range"
                class="block mb-2 text-sm font-medium"
            >
                Lines Probability: {{ linesProbability }}
            </label>
            <div class="flex items-center gap-2">
                <span>0</span>
                <input
                    id="lines-probability-range"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    :class="rangeInputClass"
                    v-model="linesProbability"
                    @change="generateCircles"
                />
                <span>1</span>
            </div>
        </div>
        <div>
            <label
                for="arcs-probability-range"
                class="block mb-2 text-sm font-medium"
            >
                Small Squares Probability: {{ arcsProbability }}
            </label>
            <div class="flex items-center gap-2">
                <span>0</span>
                <input
                    id="arcs-probability-range"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    :class="rangeInputClass"
                    v-model="arcsProbability"
                    @change="generateCircles"
                />
                <span>1</span>
            </div>
        </div>
        <div class="flex justify-center items-center">
            <button class="btn" @click="generateCircles">New Canvas</button>
        </div>
    </div>
</template>

<script setup>
import { computed, normalizeClass } from 'vue';
import { valueToLog } from '@/utils/mathUtils.js';

const linesProbability = defineModel('linesProbability', {
    type: Number,
    required: true,
});
const arcsProbability = defineModel('arcsProbability', {
    type: Number,
    required: true,
});
const numSlicesLog = defineModel('numSlicesLog', {
    type: Number,
    required: true,
});

const numSlices = computed(() => {
    return Math.ceil(valueToLog(numSlicesLog.value, 0, 100, 1, 2000));
});

const emit = defineEmits(['generateCircles']);

const generateCircles = () => {
    emit('generateCircles');
};

const rangeInputClass = normalizeClass([
    'w-full h-2',
    'bg-tertiary cursor-pointer appearance-none',
    'disabled:opacity-50 disabled:pointer-events-none focus:outline-none',
    '[&::-webkit-slider-thumb]:w-3.5',
    '[&::-webkit-slider-thumb]:h-3.5',
    '[&::-webkit-slider-thumb]:appearance-none',
    '[&::-webkit-slider-thumb]:bg-primary',
    '[&::-webkit-slider-thumb]:dark:bg-primary',
    '[&::-webkit-slider-thumb]:shadow-[0_0_0_0.175rem]',
    '[&::-webkit-slider-thumb]:shadow-accent',
    '[&::-webkit-slider-thumb]:transition-all',
    '[&::-webkit-slider-thumb]:duration-150',
    '[&::-webkit-slider-thumb]:ease-in-out',
]);
</script>
