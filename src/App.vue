<script setup lang="ts">
import { onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Logout from './components/Logout.vue';
import { computed } from 'vue';
import { useAuthStore } from './stores/authStore';

onMounted(() => {
  tokensStore.fetchSession()
})

const tokensStore = useAuthStore()

const accessToken = computed(() => tokensStore.accessJWT)

</script>

<template>
  <Logout v-if="accessToken" />
  <Login v-else-if="accessToken === ''"/>
  <Register />
  <HelloWorld msg="TEST" />

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
