import { createRouter, createWebHistory } from "vue-router";
import Transactions from "@/pages/Transactions.vue";
import Home from "@/pages/Home.vue";
import Profile from "@/pages/Profile.vue";
import Notification from "@/pages/Notification.vue";
import TransInfoCreate from "@/pages/TransInfoCreate.vue";
import TransList from "@/pages/TransList.vue";
import IncomeChart from "@/pages/IncomeChart.vue";
import ExpensesChart from "@/pages/ExpensesChart.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        {
            path: '/transactions', component: Transactions,
            children: [
                { name: 'TransList', path: 'list', component: TransList }
            ]
        },
        { path: '/profile', component: Profile },
        { path: '/notification', component: Notification },
        { path: '/transinfocreate', component: TransInfoCreate },
        { path: '/incomechart', component: IncomeChart},
        { path: '/expensesChart', component: ExpensesChart},
    ]
})

export default router