<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
    await authStore.userLogout()
    router.push('/login2')
    console.log('successful logout')
}

const toWelcome = async () => {
    router.push('/welcome')
}

const user = computed(() => authStore.user)
</script>

<template>
    <h1>2nd page!</h1>
    <h3>{{ user }}</h3>
    <button @click="handleLogout">LOGOUT</button>
    <button @click="toWelcome">TO WELCOME</button>
</template>

<style scoped>

</style>
