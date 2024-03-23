<template>
    <DialogComponent ref="downloadDialog">
        <p>
            Download the canvas as
            <input
                class="w-fit"
                type="text"
                placeholder="canvas"
                v-model="canvasFileName"
            />.png?
        </p>
        <div class="flex flex-1 justify-between">
            <button class="btn-gray w-28" @click="downloadCanvas">
                continue
            </button>
            <button
                autofocus
                class="btn-red w-28"
                @click="downloadDialog?.dialogRef?.close()"
            >
                cancel
            </button>
        </div>
    </DialogComponent>
</template>

<script setup>
import { ref } from 'vue';
import DialogComponent from '@/components/DialogComponent.vue';

const props = defineProps({
    canvas_uuid: {
        type: String,
        required: true,
    },
});

const downloadDialog = ref(null);
const canvasFileName = ref('');

defineExpose({ downloadDialog });

const downloadCanvas = () => {
    const canvasElement = document.getElementById(props.canvas_uuid);
    if (!canvasElement) {
        return;
    }
    const link = document.createElement('a');
    link.download = `${canvasFileName.value || 'canvas'}.png`;
    link.href = canvasElement.toDataURL();
    link.click();
    downloadDialog.value?.dialogRef?.close();
};
</script>
