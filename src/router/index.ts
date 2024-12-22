import { createRouter, createWebHistory, type Router } from "vue-router";

import layout from "@/views/layout/index.vue";

const route: Router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: layout,
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
