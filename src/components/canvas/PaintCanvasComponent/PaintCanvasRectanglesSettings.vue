<template>
    <div class="flex flex-col px-10 gap-2">
        <div>
            <label
                for="square-probability-range"
                class="block mb-2 text-sm font-medium"
            >
                Squares Probability: {{ squareProbability }}
            </label>
            <div class="flex items-center gap-2">
                <span>0</span>
                <input
                    id="square-probability-range"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    :class="rangeInputClass"
                    v-model="squareProbability"
                />
                <span>1</span>
            </div>
        </div>
        <div>
            <label
                for="small-square-probability-range"
                class="block mb-2 text-sm font-medium"
            >
                Small Squares Probability: {{ smallSquareProbability }}
            </label>
            <div class="flex items-center gap-2">
                <span>0</span>
                <input
                    id="small-square-probability-range"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    :class="rangeInputClass"
                    v-model="smallSquareProbability"
                />
                <span>1</span>
            </div>
        </div>
        <div class="flex justify-between items-center gap-4">
            <FontAwesomeIcon
                :icon="faMinus"
                class="btn"
                @click="updateDivisions(props.divisions - 1)"
            />
            <div>
                <div class="flex justify-between items-center gap-1">
                    <span class="font-bold text-base">Divisions:</span>
                    <span class="min-w-[3ch] text-end">{{
                        props.divisions
                    }}</span>
                </div>
            </div>
            <FontAwesomeIcon
                :icon="faPlus"
                class="btn"
                @click="updateDivisions(props.divisions + 1)"
            />
        </div>
        <div class="flex justify-center">
            <button class="btn w-fit" @click="generateRectangles">
                Update Canvas
            </button>
        </div>
    </div>
</template>

<script setup>
import { normalizeClass } from 'vue';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
    divisions: {
        type: Number,
        required: true,
    },
});

const squareProbability = defineModel('squareProbability', {
    type: Number,
    required: true,
});
const smallSquareProbability = defineModel('smallSquareProbability', {
    type: Number,
    required: true,
});

const emit = defineEmits(['updateDivisions', 'generateRectangles']);

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const updateDivisions = (value) => {
    emit('updateDivisions', clamp(value, 1, 30));
};

const generateRectangles = () => {
    emit('generateRectangles');
};

const rangeInputClass = normalizeClass([
    'w-full h-2 bg-secondary appearance-none cursor-pointer',
    'disabled:opacity-50 disabled:pointer-events-none focus:outline-none',
    '[&::-webkit-slider-thumb]:w-3.5',
    '[&::-webkit-slider-thumb]:h-3.5',
    '[&::-webkit-slider-thumb]:appearance-none',
    '[&::-webkit-slider-thumb]:bg-primary',
    '[&::-webkit-slider-thumb]:shadow-[0_0_0_0.175rem]',
    '[&::-webkit-slider-thumb]:dark:shadow-[0_0_0_0.175rem]',
    '[&::-webkit-slider-thumb]:transition-all',
    '[&::-webkit-slider-thumb]:duration-150',
    '[&::-webkit-slider-thumb]:ease-in-out',
    '[&::-webkit-slider-thumb]:dark:bg-slate-700',
]);
</script>
