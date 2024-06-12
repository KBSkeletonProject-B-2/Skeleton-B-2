import { createRouter, createWebHistory } from "vue-router";
import Transactions from "@/pages/Transactions.vue";
import Home from "@/pages/Home.vue";
import Profile from "@/pages/Profile.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/transactions', component: Transactions },
        { path: '/profile', component: Profile },
        { path: '/', component: Home }
    ]
})

export default router