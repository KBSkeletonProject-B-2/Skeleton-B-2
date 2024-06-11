import { createRouter, createWebHistory } from "vue-router";
import TransInfoCreate from "@/pages/TransInfoCreate.vue";
import Transactions from "@/pages/Transactions.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/transinfocreate', component: TransInfoCreate },
        { path: '/transactions', component: Transactions}       
    ]
})

export default router