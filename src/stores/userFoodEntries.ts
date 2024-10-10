import { defineStore } from "pinia";

import { ref } from "vue";

interface Food {
    id: string;
    name: string;
    carbohydrates: number;
    proteins: number;
    fats: number;
    calories: number
    gi: number | null
}

interface UserFoodEntry {
    id: string,
    food: Food
}

interface User {
    username: string
    id: string
    email: string
}


export const useUserFoodEntries = defineStore('userFoodEntries', () => { 

    const userFoodEntries = ref<Food[]>([])


    const addUserFoodEntry = async (food: Food, userId: User["id"]) => {


        try{
            const response = await fetch("http://localhost:3000/userFoodList/", {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId, foodId: food.id})
            })
            const result = await response.json()
            if(response.ok){

                console.log("Success: ", result)
                userFoodEntries.value.push(food)
            }else{
                console.log("Fail: ", result)
            }

        }
        catch(err){
            console.log(userFoodEntries.value)
            console.log(food)
            console.log("Catch Err ON ADDING FOOD")
        }
    }

    const removeUserFoodEntry = (userFoodEntryId: string) => {
        const i = userFoodEntries.value.findIndex(userFoodEntry => userFoodEntry.id = userFoodEntryId)
        if(i !== -1) {
            userFoodEntries.value.splice(i, 1)
        }else{
            console.log("Cannot find food")
        }
    }
    
    const fetchUserFoodEntries = async(userId: User["id"]) => {
        //@TODO - remember to rename the endpoint below when renamind backend
        try{
            const response = await fetch("http://localhost:3000/userFoodList/" + userId)
            const data = await response.json()
    
            console.log("FETCHED ENTRIES: ", data)
            
            if(response.ok) {
                console.log("DATA: ",data)
                userFoodEntries.value = data.map((entry: UserFoodEntry) => entry.food)
            }else{
                console.log("response fetched but not ok")
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return {
        fetchUserFoodEntries,
        userFoodEntries,
        addUserFoodEntry,
        removeUserFoodEntry
    }
})