<script setup lang="ts">
import { ref } from 'vue';

const username = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')

const logAttempt = ref<number>(0)

const handleRegister = async(e: Event) => {
    try{
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email.value, username: username.value, password: password.value })
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Success: ', result)
            logAttempt.value = 1;
        }else{
            const result = await response.json();
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
    <h2>REGISTER</h2>
    <form @submit.prevent="handleRegister">
        <label>
            email:
            <input v-model="email"/>
        </label>
        <label>
            username:
            <input v-model="username"/>
        </label>
        <label>
            password:
            <input v-model="password"/>
        </label>
        <button type="submit">Register</button>
        <h3>{{ logAttempt == 0 ? '' : logAttempt == 1 ? "Successfully Registered" : "Unsuccessful register" }}</h3>
    </form>
</template>

<style scoped>
</style>
