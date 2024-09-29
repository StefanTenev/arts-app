import { defineStore } from "pinia";
import { ref, reactive, computed, onMounted } from "vue";

interface User {
    username: string
    id: string
    email: string
}


export const useTokensStore = defineStore('tokens', () => {

    const user = reactive<User>({
        username: '',
        id: '', 
        email: '',
    })
    const csrfToken = ref<string>('');
    const accessJWT = ref<string>('');
    const isLoading = ref<boolean>(false);

    
    const logFetchUser = async(username: string, password: string) => {
        console.log(username, password)
        isLoading.value = true
        //@ TODO - fix type below
        try {
            const response: any = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })

            const result = await response.json()

            if(response.ok){

                user.username = username
                user.id = result.user.id
                user.email = result.user.email
                accessJWT.value = result.accessToken
                csrfToken.value = result.csrfToken

            }else{

                console.log(result)
            }
        }
        catch(err){
            console.log(err)
        }

        isLoading.value = false
    }



    const logoutUser = async () => {
        try {
            const response: any = await fetch("http://localhost:3000/auth/logout", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: user.username, userId: user.id })
            })

            const result = await response.json()

            if(response.ok){

                user.username = ''
                user.id = ''
                user.email = ''
                accessJWT.value = ''
                csrfToken.value = ''

            }else{

                console.log(result)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return { 
        user, 
        isLoading, 
        csrfToken,
        accessJWT,
        logFetchUser,
        logoutUser
    }

})