<script setup lang="ts">
import { reactive } from 'vue';
import { useFoodsStore } from '../stores/foodsStore';

interface Food {
    id?: string;
    name: string;
    carbohydrates: number;
    proteins: number;
    fats: number;
    calories: number
    gi: number | null
}


const addFood = (food: Food) => {
    useFoodsStore().addFood(food)
}

const food = reactive({
    name: '',
    carbohydrates: 0,
    proteins: 0,
    fats: 0,
    calories: 0,
    gi: 0,
})


const handleSubmit = async (_e: Event) => {
    try{
    const response = await fetch('http://localhost:3000/foods/', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(food)
    });
    const result = await response.json();
    if (response.ok) {
      console.log('Success: ', result)
      addFood(food)
    }else{
      console.error("Fail: ", result )
    }
  }
  catch(err){
    console.error('catch err: ', err)
  }


}

</script>

<template>
    <form @submit.prevent="handleSubmit" class="grid">
        FOOD
        <label>
            Name:
            <input v-model="food.name" />
        </label>
        <label>
            Carbohydrates:
            <input v-model.number="food.carbohydrates" />
        </label>
        <label>
            Proteins:
            <input v-model.number="food.proteins" />
        </label>
        <label>
            Fats:
            <input v-model.number="food.fats" />
        </label>
        <label>
            Calories:
            <input v-model.number="food.calories" />
        </label>
        <label>
            Gi:
            <input v-model.number="food.gi" />
        </label>
        
        <button type="submit">ADD FOOD</button>
    </form>
</template>

<style scoped>
.grid {
    display: grid;
    margin-bottom: 1rem;
}
</style>