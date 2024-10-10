import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { Router } from "vue-router";
import { Component } from "vue";

import Login from "../components/Login.vue";
import Welcome from "../components/Welcome.vue";
import Register from "../components/Register.vue";
import SecondPage from "../components/SecondPage.vue";

interface Route {
    path: string
    name?: string
    component: Component
    // @TODO - look for meta types
    meta?: any;
}

const routes: Route[] = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { guest: true },
    },
    {
        path: '/login2',
        name: 'Login2',
        component: Login,
        meta: { noFetch: true },
    },
    {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome,
        meta: { requiresAuth: true, logged: true },
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { guest: true },
    },
    {
        path: '/second-page',
        name: 'SecondPage',
        component: SecondPage,
        meta: { requiresAuth: true, logged: true },
    },
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation Guards
router.beforeEach( async (to, from, next) => {

    if(to.meta.noFetch && from.meta.logged){
        next()
        return
    }else if(to.meta.noFetch && !from.meta.logged){
        next('/login');
        return
    }
    
    const authStore = useAuthStore();
    await authStore.fetchSession();
    //console.log("STORE ACESS TOKEN: ", authStore.accessJWT)
    const hasAccessJWT = !!authStore.accessJWT ;
    const hasCSRF = !!authStore.csrfToken

    if (to.meta.requiresAuth && !hasAccessJWT && !hasCSRF) {
      next('/login');
      return
    } else if (to.meta.guest && hasAccessJWT && hasCSRF) {
      next('/welcome');
      return
    } else {
      next();
      return
    }
});

export default router