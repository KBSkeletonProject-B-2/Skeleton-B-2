import { createRouter, createWebHistory } from "vue-router";
import Transactions from "@/pages/Transactions.vue";
import Home from "@/pages/Home.vue";
import Profile from "@/pages/Profile.vue";
import Language from "@/pages/Language.vue";
import Theme from "@/pages/Theme.vue"
import Notification from "@/pages/Notification.vue";
import TransInfoCreate from "@/pages/TransInfoCreate.vue";
import IncomeChart from "@/pages/IncomeChart.vue";
import ExpensesChart from "@/pages/ExpensesChart.vue";
import Person from "@/pages/Person.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/Skeleton-B-2', component: Home },
        { path: '/Skeleton-B-2/transactions', component: Transactions },
        { path: '/Skeleton-B-2/profile', component: Profile},
        { path: '/Skeleton-B-2/notification', component: Notification },
        { path: '/Skeleton-B-2/transinfocreate', component: TransInfoCreate },
        { path: '/Skeleton-B-2/incomechart', component: IncomeChart },
        { path: '/Skeleton-B-2/expensesChart', component: ExpensesChart },
        { path: '/Skeleton-B-2/language', component: Language },
        { path: '/Skeleton-B-2/theme', component: Theme },
        { path: '/Skeleton-B-2/person', component: Person },
    ]
})

export default router
