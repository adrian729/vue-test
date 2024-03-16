<template>
    <div class="greetings">
        <h1 class="green">{{ msg }}</h1>
        <h3>You've successfully created a project with Vite and Vue 3.</h3>
        <div class="container">
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

defineProps({
    msg: {
        type: String,
        required: true,
    },
});

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
