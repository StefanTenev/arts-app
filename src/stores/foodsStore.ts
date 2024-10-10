import { defineStore } from "pinia";
import { ref } from "vue";

interface Food {
    id?: string;
    name: string;
    carbohydrates: number;
    proteins: number;
    fats: number;
    calories: number
    gi: number | null
}


export const useFoodsStore = defineStore('foods', () => { 

    const foods = ref<Food[]>([])


    const addFood = (food: Food) => {
        foods.value.push(food)
    }

    const removeFood = (foodId: string) => {
        const i = foods.value.findIndex( food => food.id = foodId)
        if(i !== -1) {
            foods.value.splice(i, 1)
        }else{
            console.log("Cannot find food")
        }
    }
    
    const fetchFoods = async() => {
        const response = await fetch("http://localhost:3000/foods")
        const data = await response.json()

        console.log(data)

        foods.value = data
    }

    return {
        fetchFoods,
        foods,
        addFood,
        removeFood
    }
})