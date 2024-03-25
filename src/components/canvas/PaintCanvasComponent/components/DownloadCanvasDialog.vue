<template>
    <DialogComponent ref="downloadDialog">
        <p>
            Download the canvas as
            <input
                class="w-fit bg-primary text-primary-text px-2"
                type="text"
                placeholder="canvas"
                v-model="canvasFileName"
            />.png?
        </p>
        <div class="min-w-72 pt-4 flex flex-1 justify-between">
            <button
                class="btn bg-primary text-primary-text w-28"
                @click="downloadCanvas"
            >
                continue
            </button>
            <button autofocus class="btn-red w-28" @click="close()">
                cancel
            </button>
        </div>
    </DialogComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DialogComponent from '@/components/DialogComponent.vue';

interface Props {
    canvas_uuid: string;
}
const props = defineProps<Props>();

const downloadDialog = ref<InstanceType<typeof DialogComponent> | null>(null);
const canvasFileName = ref<string>('');

const open = () => downloadDialog.value?.open();
const close = () => downloadDialog.value?.close();
defineExpose({ open, close });

const downloadCanvas = () => {
    const canvasElement = document.getElementById(
        props.canvas_uuid,
    ) as HTMLCanvasElement;
    if (!canvasElement) {
        return;
    }
    const link = document.createElement('a');
    link.download = `${canvasFileName.value || 'canvas'}.png`;
    link.href = canvasElement.toDataURL();
    link.click();
    close();
};
</script>
