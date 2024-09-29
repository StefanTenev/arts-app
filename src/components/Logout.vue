<script setup lang="ts">
// import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore()

const handleLogout = async () => {
    await authStore.userLogout()
    console.log('successful logout')
}
</script>

<template>
    <button @click="handleLogout">LOGOUT</button>
</template>

<style scoped>

</style>
