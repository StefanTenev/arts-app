import { defineStore } from "pinia";
import { ref, reactive } from "vue";

interface User {
    username: string
    id: string
    email: string
}


export const useAuthStore = defineStore('tokens', () => {

    const user = reactive<User>({
        username: '',
        id: '', 
        email: '',
    })
    const csrfToken = ref<string>('');
    const accessJWT = ref<string>('');
    const isLoading = ref<boolean>(false);

    
    const userLogin = async(username: string, password: string) => {
        isLoading.value = true
        //@ TODO - fix type below
        try {
            const response: any = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                credentials: 'include',
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

    const userLogout = async () => {
        try {
            const response: any = await fetch("http://localhost:3000/auth/logout", {
                method: "POST",
                credentials: 'include',
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

    const fetchSession = async () => {
        try {
            const response: any = await fetch("http://localhost:3000/auth/session", {
                method: "POST",
                credentials: 'include', // send cookie
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const result = await response.json()

            if(response.ok){

                user.username = result.user.username
                user.id = result.user.id
                user.email = result.user.email
                accessJWT.value = result.accessToken
                csrfToken.value = result.csrfToken

            }else{

                console.log(result)
            }
        }
        catch(err){
            console.log(' error: ', err)
        }
    }

    return { 
        user, 
        isLoading, 
        csrfToken,
        accessJWT,
        userLogin,
        userLogout,
        fetchSession
    }

})