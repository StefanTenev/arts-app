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

const user = computed(() => authStore.user)

const toSecondPage = async () => {
    console.log(authStore)
    router.push('/second-page')

    return { noFetch: true }
}
</script>

<template>
    <h1>WELCOME!</h1>
    <h3>{{ user }}</h3>
    <button @click="handleLogout">LOGOUT</button>
    <button @click="toSecondPage">TO SECOND PAGE</button>
</template>

<style scoped>

</style>
