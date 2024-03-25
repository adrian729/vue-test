<template>
    <div>
        <FontAwesomeIcon
            class="cursor-pointer"
            v-if="!menuOpen"
            :icon="faBars"
            @click="menuOpen = true"
        />
        <aside :class="asideClass" v-if="menuOpen" @click="menuOpen = false">
            <div class="p-4 flex justify-between items-center">
                <div class="cursor-pointer">
                    <router-link to="/">
                        <h1 class="text-xl font-bold">Home</h1>
                    </router-link>
                </div>
                <FontAwesomeIcon
                    class="cursor-pointer"
                    :icon="faXmark"
                    @click="menuOpen = false"
                />
            </div>
            <nav>
                <DividerComponent
                    class="text-sm"
                    text="Canvas"
                    :start="false"
                />
                <SidebarNavItem text="Paint canvas" to="/canvas" />
                <SidebarNavItem text="Canvas list" to="/canvas-list" />
                <DividerComponent class="text-sm" text="Theme" :end="false" />
                <SidebarNavItem text="Theme overview" to="/theme" />
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
import SidebarNavItem from './components/SidebarNavItem.vue';

const menuOpen = ref(false);

// -- Style Classes
const asideClass = computed(() => {
    return normalizeClass([
        'fixed top-0 left-0',
        'h-full z-10 overflow-auto',
        'min-w-fit max-w-xs w-3/5',
        'bg-secondary text-on-secondary text-base shadow-md shadow-accent',
    ]);
});

const navItemClass = computed(() => {
    return normalizeClass([
        'px-2 py-1 mb-1',
        'font-bold',
        'shadow shadow-accent',
        'bg-tertiary text-on-tertiary',
        'border-t-2 border-accent',
    ]);
});
</script>
