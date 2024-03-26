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
                <li class="flex justify-center items-center">
                    <FontAwesomeIcon
                        class="cursor-pointer px-2 py-1 hover:bg-primary-hover"
                        :icon="faLinkedin"
                    />
                </li>
                <li class="flex justify-center items-center">
                    <FontAwesomeIcon
                        class="cursor-pointer px-2 py-1 hover:bg-primary-hover"
                        :icon="faGithub"
                    />
                </li>
            </ul>
            <button :class="toggleThemeClass" @click="toggleTheme">
                <FontAwesomeIcon :icon="themeChangeIconMoon" />
                <FontAwesomeIcon :icon="themeChangeIconSun" />
            </button>
        </div>
    </header>
</template>

<script setup lang="ts">
// -- Imports
import { ref, computed, onMounted, normalizeClass } from 'vue';
// -- Fonts
import {
    faGithub,
    faLinkedin,
    type IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
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
const theme = ref<string | null>(null);

onMounted(() => {
    setTheme();
});

const themeChangeIconMoon = computed<IconDefinition>(() =>
    theme.value === THEME_DARK ? fasMoon : farMoon,
);

const themeChangeIconSun = computed<IconDefinition>(() =>
    theme.value === THEME_DARK ? fasSun : farSun,
);

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
const headerClass = computed<string>(() =>
    normalizeClass([
        'bg-primary text-on-primary',
        'sticky top-0',
        'min-h-10 h-fit px-5 py-4',
        'shadow-md',
        'flex justify-between items-center',
    ]),
);

const toggleThemeClass = computed<string>(() =>
    normalizeClass([
        'bg-container-primary text-on-container-primary',
        'hover:bg-container-primary-hover',
        'py-2 px-4 rounded',
        'shadow shadow-on-primary',
        'flex gap-1',
    ]),
);
</script>
