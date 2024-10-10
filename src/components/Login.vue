<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

const username = ref<string>('')
const password = ref<string>('')

const logAttempt = ref<number>(0)

const handleLogStuff = () => {
    console.log(authStore)
}
const handleLogin = async () => {
    await authStore.userLogin(username.value, password.value)
    router.push('/welcome')
    //console.log(authStore.user, authStore.accessJWT, authStore.csrfToken)
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
