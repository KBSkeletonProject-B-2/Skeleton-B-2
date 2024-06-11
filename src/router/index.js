import { createRouter, createWebHistory } from "vue-router";
import TransInfoCreate from "@/pages/TransInfoCreate.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/transinfocreate', component: TransInfoCreate }
    ]
})

export default router