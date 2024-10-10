<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import Foods from './Foods.vue';
import { useFoodsStore } from '../stores/foodsStore';
import { useUserFoodEntries } from '../stores/userFoodEntries';

import FoodEntries from './FoodEntries.vue';

interface Food {
    id: string;
    name: string;
    carbohydrates: number;
    proteins: number;
    fats: number;
    calories: number
    gi: number | null
}


const foodsStore = useFoodsStore()


onMounted(async () => {
    foodsStore.fetchFoods()
})
const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
    await authStore.userLogout()
    router.push('/login2')
    //console.log('successful logout')
}

const toWelcome = async () => {
    router.push('/welcome')
}

const user = computed(() => authStore.user)

const foodEntriesStore = useUserFoodEntries()

const addFood = (food: Food) => {
    // foodsStore.addFood(food)
    console.log("Food id: ", food.id)
    console.log("User id: ", user.value.id)
    foodEntriesStore.addUserFoodEntry(food, user.value.id)
}

</script>

<template>
    <h1>2nd page!</h1>
    <h3>{{ user }}</h3>
    <button @click="handleLogout">LOGOUT</button>
    <button @click="toWelcome">TO WELCOME</button>

    <hr>
    <div class="flex">
        <div class="foods">
            <Foods />

            <div v-for="food in foodsStore.foods" class="box flex">
                <div>
                    <h3> {{ food.name }} </h3>
                    <div class="grid">
                        <p>Calories: {{ food.calories }}</p>
                        <p>Carbohydrates: {{ food.carbohydrates }}</p>
                        <p>Proteins: {{ food.proteins }}</p>
                        <p>Fats: {{ food.fats }}</p>
                    </div>
                </div>
                <div class="grid">
                    <button  @click="addFood(food)">Add to list</button>
                </div>
            </div>
        </div>
        <div class="grid">
            <FoodEntries />
        </div>
    </div>
</template>

<style scoped>

.box {
    border: 1px solid black;
    justify-content: center;
}

.foods{
    display: grid;
    width: 20rem;
}
h3, p {
    margin: 0;
}
</style>

