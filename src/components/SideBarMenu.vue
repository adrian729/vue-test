<template>
    <div>
        <FontAwesomeIcon
            class="cursor-pointer"
            v-if="!menuOpen"
            :icon="faBars"
            @click="menuOpen = true"
        />
        <aside :class="asideClass" v-if="menuOpen" @click="menuOpen = false">
            <div class="flex justify-between items-center">
                <div class="cursor-pointer">
                    <router-link class="w-full" to="/">
                        <h1 class="text-sm font-bold">Home</h1>
                    </router-link>
                </div>
                <FontAwesomeIcon
                    class="cursor-pointer"
                    :icon="faXmark"
                    @click="menuOpen = false"
                />
            </div>
            <nav>
                <DividerComponent class="text-sm" text="Canvas" />
                <div class="mb-4">
                    <router-link class="w-full" to="/canvas">
                        <span class="font-bold">Paint canvas</span>
                    </router-link>
                </div>
                <div class="mb-4">
                    <router-link class="w-full" to="/canvas-list">
                        <span class="font-bold">Canvas list</span>
                    </router-link>
                </div>
            </nav>
        </aside>
    </div>
</template>
<script setup>
// -- Imports
import { ref, computed, normalizeClass } from 'vue';
// -- Fonts
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
// -- Components
import DividerComponent from '@/components/DividerComponent.vue';

const menuOpen = ref(false);

// -- Style Classes
const asideClass = computed(() => {
    return normalizeClass([
        'fixed top-0 left-0',
        'h-full z-10 overflow-auto',
        'min-w-fit max-w-xs w-3/5 p-4  ',
        'bg-primary text-secondary text-base shadow',
    ]);
});
</script>
