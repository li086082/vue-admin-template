import { createRouter, createWebHistory, type Router } from "vue-router";

import Layout from "@/views/layout/index.vue";
import Login from "@/views/login/index.vue";

const route: Router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/login",
            component: Login,
        },
        {
            path: "/",
            component: Layout,
            children: [
                {
                    path: "/",
                    component: () => import("@/views/login/index.vue"),
                },
            ],
        },
    ],
});

export default route;
