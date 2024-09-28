<script setup lang="ts">
// import { ref } from 'vue';
import { useTokensStore } from '../stores/tokens';

const tokensStore = useTokensStore()

const handleLogout = async () => {
    await tokensStore.logoutUser()
    console.log('successful logout')
}
</script>

<template>
    <button @click="handleLogout">LOGOUT</button>
</template>

<style scoped>

</style>
