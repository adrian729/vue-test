<template>
    <DialogComponent ref="uploadDialog">
        <p>Upload canvas?</p>
        <div class="min-w-72 pt-4 flex flex-1 justify-between">
            <button class="btn-gray w-28" @click="uploadCanvas">
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
import axios from 'axios';
import DialogComponent from '@/components/DialogComponent.vue';

const jsonServerUrl = import.meta.env.VITE_JSON_SERVER_URL;

interface Props {
    canvasData: Record<string, unknown>;
}
const props = withDefaults(defineProps<Props>(), {
    canvasData: () => ({}),
});

const uploadDialog = ref<InstanceType<typeof DialogComponent> | null>(null);

const open = () => uploadDialog.value?.open();
const close = () => uploadDialog.value?.close();
defineExpose({ open, close });

const uploadCanvas = () => {
    if (!props.canvasData) {
        return;
    }
    axios
        .post(`${jsonServerUrl}/canvas`, props.canvasData)
        .then((response) => {
            console.log('uploadCanvas', response.data);
        })
        .catch((error) => console.error(error));
    close();
};
</script>
