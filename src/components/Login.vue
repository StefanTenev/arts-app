<script setup lang="ts">
import { ref } from 'vue';
import { useTokensStore } from '../stores/tokens';

const tokensStore = useTokensStore()

const username = ref<string>('')
const password = ref<string>('')

const logAttempt = ref<number>(0)

const handleLogStuff = () => {
    console.log(tokensStore)
}
const handleLogin = async () => {
    await tokensStore.logFetchUser(username.value, password.value)
    console.log(tokensStore.user, tokensStore.accessJWT, tokensStore.csrfToken)
}
</script>

<template>
    <h2>LOGIN</h2>
    <form @submit.prevent="handleLogin">
        <label>
            username:
            <input v-model="username"/>
        </label>
        <label>
            password:
            <input v-model="password"/>
        </label>
        <button type="submit">Login</button>
    </form>
    <h3>{{ logAttempt == 0 ? '' : logAttempt == 1 ? "Successfully Logged" : "Unsuccessfully logged" }}</h3>
    <button @click="handleLogStuff">log stuff</button>
</template>

<style scoped>

</style>
