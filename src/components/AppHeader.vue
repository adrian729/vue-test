<template>
    <header :class="headerClass">
        <h3 class="font-bold text-2xl">Vue-test</h3>
        <div id="appHeaderLeft" class="flex gap-4">
            <ul class="flex items-center gap-2">
                <li>
                    <FontAwesomeIcon :icon="faLinkedin" />
                </li>
                <li>
                    <FontAwesomeIcon :icon="faGithub" />
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
import { ref, computed, onMounted, normalizeClass } from 'vue';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
    faMoon as farMoon,
    faSun as farSun,
} from '@fortawesome/free-regular-svg-icons';
import {
    faMoon as fasMoon,
    faSun as fasSun,
} from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';

// const data = reactive({
//     users: [],
// });
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

// const loadUsers = () => {
//     axios
//         .get('https://my-json-server.typicode.com/adrian729/vue-test/users')
//         .then((response) => {
//             data.users = response.data;
//         })
//         .catch((error) => console.error(error));
// };
// loadUsers();

// -- Style Classes
const headerClass = computed(() => {
    return normalizeClass([
        'sticky top-0',
        'bg-secondary text-primary',
        'min-h-10 h-fit px-4 py-2',
        'flex justify-between items-center',
    ]);
});

const themeToggleClass = computed(() => {
    return normalizeClass([
        'bg-primary text-secondary font-semibold',
        'py-2 px-4 rounded shadow',
        'flex gap-1',
    ]);
});
</script>
