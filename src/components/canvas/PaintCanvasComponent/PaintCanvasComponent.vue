<template>
    <div class="flex flex-col m-2">
        <div class="flex justify-between items-center py-4">
            <h1 class="font-bold text-xl">Paint Canvas</h1>
            <div class="flex justify-between gap-1">
                <button class="btn-gray w-10" @click="openUploadDialog">
                    <FontAwesomeIcon :icon="faArrowUp" />
                </button>
                <button class="btn-gray w-10" @click="openDownloadDialog">
                    <FontAwesomeIcon :icon="faDownload" />
                </button>
            </div>
        </div>
        <UploadCanvasDialog :canvasData="canvasData" ref="uploadDialog" />
        <DownloadCanvasDialog :canvas_uuid="canvas_uuid" ref="downloadDialog" />
        <DividerComponent />
        <div
            class="flex justify-around items-center gap-4 px-4 py-1 bg-slate-50 dark:bg-slate-900"
        >
            <FontAwesomeIcon
                :class="iconClass('circles')"
                :icon="canvasType === 'circles' ? fasCircle : farCircle"
                @click="canvasType = 'circles'"
            />
            <FontAwesomeIcon
                :class="iconClass('rectangles')"
                :icon="canvasType === 'rectangles' ? fasSquare : farSquare"
                @click="canvasType = 'rectangles'"
            />
        </div>
        <DividerComponent />
        <PaintCanvasCircles
            v-if="canvasType === 'circles'"
            :canvas_uuid="canvas_uuid"
            :width="dimensions.width"
            :height="dimensions.height"
            @updateCanvasData="canvasData = $event"
        />
        <PaintCanvasRectangles
            v-if="canvasType === 'rectangles'"
            :canvas_uuid="canvas_uuid"
            :width="dimensions.width"
            :height="dimensions.height"
            @updateCanvasData="canvasData = $event"
        />
    </div>
</template>

<script setup lang="ts">
// -- Imports
import { uuid } from 'vue-uuid';
import { ref, normalizeClass } from 'vue';
// -- Fonts
import { faDownload, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {
    faSquare as farSquare,
    faCircle as farCircle,
} from '@fortawesome/free-regular-svg-icons';
import {
    faSquare as fasSquare,
    faCircle as fasCircle,
} from '@fortawesome/free-solid-svg-icons';
// -- Components
import DividerComponent from '@/components/DividerComponent.vue';
import PaintCanvasRectangles from './components/rectangles/PaintCanvasRectangles.vue';
import PaintCanvasCircles from './components/circles/PaintCanvasCircles.vue';
import DownloadCanvasDialog from './components/DownloadCanvasDialog.vue';
import UploadCanvasDialog from './components/UploadCanvasDialog.vue';
// -- Types
import type { CanvasType } from '@/components/canvas/types';

const canvas_uuid = uuid.v4();

const canvasType = ref<CanvasType>('circles');

const uploadDialog = ref<InstanceType<typeof UploadCanvasDialog> | null>(null);
const downloadDialog = ref<InstanceType<typeof DownloadCanvasDialog> | null>(
    null,
);

interface Dimensions {
    width: number;
    height: number;
}
const dimensions = ref<Dimensions>({ width: 1080, height: 1080 }); // keep same aspect ratio as in css
const canvasData = ref({}); // TODO: Type this

const openUploadDialog = () => uploadDialog.value?.open();

const openDownloadDialog = () => downloadDialog.value?.open();

const iconClass = (iconType: string) =>
    normalizeClass([
        'w-32 py-2',
        'cursor-pointer',
        'hover:text-xl hover:bg-slate-300 dark:hover:bg-slate-700',
        canvasType.value === iconType ? 'text-xl' : '',
    ]);
</script>
