<template>
    <div class="container">
        <button
            className="flex-initial font-bold text-red-800 bg-red-200 p-2 rounded-md"
            @click="toggleTheme"
        >
            Change Mode (Dark/Light)
        </button>
        <h1>{{ msg }}</h1>
        <h3>You've successfully created a project with Vite and Vue 3.</h3>
        <div class="flex flex-col items-center">
            <h2 class="text-3xl font-bold underline">Users</h2>
            <ul class="list-inside list-disc">
                <li v-for="user in data.users" :key="user.id">
                    {{ user.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios';

const data = reactive({
    users: [],
});

defineProps({
    msg: {
        type: String,
        required: true,
    },
});

const setTheme = () => {
    if (!('theme' in localStorage)) {
        localStorage.theme = window.matchMedia('(prefers-color-scheme: dark)')
            .matches
            ? 'dark'
            : 'light';
    }

    if (localStorage.theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    console.log(localStorage.theme);
};
setTheme();

const toggleTheme = () => {
    localStorage.theme = localStorage.theme === 'dark' ? 'light' : 'dark';
    setTheme();
};

const loadUsers = () => {
    axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            data.users = response.data;
        })
        .catch((error) => console.error(error));
};
loadUsers();
</script>
