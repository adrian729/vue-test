<template>
    <header :class="headerClass">
        <div class="text-2xl flex items-center gap-8">
            <SidebarMenu />
            <router-link class="w-full" to="/">
                <h3 class="font-bold text-2xl">Vue-test</h3>
            </router-link>
        </div>
        <div id="appHeaderLeft" class="flex gap-4">
            <ul class="flex items-center gap-2">
                <li>
                    <FontAwesomeIcon
                        class="cursor-pointer"
                        :icon="faLinkedin"
                    />
                </li>
                <li>
                    <FontAwesomeIcon class="cursor-pointer" :icon="faGithub" />
                </li>
            </ul>
            <button :class="themeToggleClass" @click="toggleTheme">
                <FontAwesomeIcon :icon="themeChangeIconMoon" />
                <FontAwesomeIcon :icon="themeChangeIconSun" />
            </button>
        </div>
    </header>
</template>

<script setup>
// -- Imports
import { ref, computed, onMounted, normalizeClass } from 'vue';
// -- Fonts
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
    faMoon as farMoon,
    faSun as farSun,
} from '@fortawesome/free-regular-svg-icons';
import {
    faMoon as fasMoon,
    faSun as fasSun,
} from '@fortawesome/free-solid-svg-icons';
// -- Components
import { SidebarMenu } from '@/components/SidebarMenu';

const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';
const theme = ref(null);

onMounted(() => {
    setTheme();
});

const themeChangeIconMoon = computed(() => {
    return theme.value === THEME_DARK ? fasMoon : farMoon;
});

const themeChangeIconSun = computed(() => {
    return theme.value === THEME_DARK ? fasSun : farSun;
});

const setTheme = () => {
    theme.value = localStorage.getItem('theme');
    if (!theme.value) {
        theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? THEME_DARK
            : THEME_LIGHT;
        localStorage.setItem('theme', theme.value);
    }

    document.documentElement.setAttribute('data-theme', theme.value); // sets the data-theme attribute
};

const toggleTheme = () => {
    localStorage.theme = localStorage.theme === 'dark' ? 'light' : 'dark';
    setTheme();
};

// -- Style Classes
const headerClass = computed(() => {
    return normalizeClass([
        'bg-primary text-on-primary',
        'sticky top-0',
        'min-h-10 h-fit px-5 py-4',
        'shadow-md',
        'flex justify-between items-center',
    ]);
});

const themeToggleClass = computed(() => {
    return normalizeClass([
        'bg-container-primary text-on-container-primary',
        'py-2 px-4 rounded',
        'shadow shadow-on-primary',
        'flex gap-1',
    ]);
});
</script>
