<script setup lang="ts">
import { ref } from 'vue';

const username = ref<string>('')
const password = ref<string>('')

const logAttempt = ref<number>(0)

const handleLogin = async () => {
    try{
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username.value, password: password.value })
        });
        const result = await response.json();
        if (response.ok) {
            console.log('Success: ', result)
            logAttempt.value = 1;
        }else{
            console.error("Fail: ", result)
            logAttempt.value = 2
        }
    }
    catch(err){
        console.error('catch err: ', err)
        logAttempt.value = 2
    }
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
</template>

<style scoped>

</style>
