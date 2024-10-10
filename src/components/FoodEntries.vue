<script setup lang="ts">
import { useAuthStore } from '../stores/authStore';
import { useUserFoodEntries } from '../stores/userFoodEntries';
import { computed, onMounted } from 'vue';

const userFoodEntriesStore = useUserFoodEntries()
const authStore = useAuthStore()

const userId = authStore.user.id
onMounted(async() => {
    await userFoodEntriesStore.fetchUserFoodEntries(userId)
    console.log(userFoodEntriesStore.userFoodEntries[0].id)
})



</script>

<template>

    <div v-for="(userFoodEntry, index) in userFoodEntriesStore.userFoodEntries" class="flex fak" :key="userFoodEntry.id + index">
        <div>
            <h3> {{ userFoodEntry.name }} </h3>
            <div class="grid">
                <p>Calories: {{ userFoodEntry.calories }}</p>
                <p>Carbohydrates: {{ userFoodEntry.carbohydrates }}</p>
                <p>Proteins: {{ userFoodEntry.proteins }}</p>
                <p>Fats: {{ userFoodEntry.fats }}</p>
            </div>
        </div>
        <div class="grid">
            <button>Remove from list</button>
        </div>
    </div>
</template>

<style scopred>
.fak {
    height: 10rem;
    border: 1px solid black;

}
p, h3{
    margin: 0;
}
</style>