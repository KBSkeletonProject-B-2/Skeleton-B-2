import { createRouter, createWebHistory } from "vue-router";
import Transactions from "@/pages/Transactions.vue";
import Home from "@/pages/Home.vue";
import Profile from "@/pages/Profile.vue";
import TransInfoCreate from "@/pages/TransInfoCreate.vue";
import TransList from "@/pages/TransList.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/transactions', component: Transactions,
        children: [
          { name: 'TransList', path: 'list', component: TransList }
        ] 
      },
        { path: '/profile', component: Profile },
        { path: '/transinfocreate', component: TransInfoCreate }
    ]
})

export default router