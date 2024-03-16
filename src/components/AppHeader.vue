<template>
    <div>
        <button @click="toggleTheme">Change Mode (Dark/Light)</button>
        <h3>You've successfully created a project with Vite and Vue 3.</h3>
        <div>
            <h2>Users</h2>
            <ul>
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

defineProps({});

const setTheme = () => {
    if (!('theme' in localStorage)) {
        localStorage.theme = window.matchMedia('(prefers-color-scheme: dark)')
            .matches
            ? 'dark'
            : 'light';
    }

    if (localStorage.theme === 'dark') {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
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
        .get('https://my-json-server.typicode.com/adrian729/vue-test/users')
        .then((response) => {
            data.users = response.data;
        })
        .catch((error) => console.error(error));
};
loadUsers();
</script>
