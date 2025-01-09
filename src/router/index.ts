import {
    createRouter,
    createWebHistory,
    type RouteLocationNormalized,
    type RouteLocationNormalizedLoaded,
    type Router,
} from "vue-router";

import Layout from "@/views/layout/index.vue";
import Login from "@/views/login/index.vue";

import pinia from "@/store/index";
import { userAppStore } from "@/store/appStore";

const userStore = userAppStore(pinia);

const route: Router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "login",
            path: "/login",
            component: Login,
        },
        {
            path: "/",
            component: Layout,
            children: [
                {
                    name: "dashboard",
                    path: "/",
                    component: () => import("@/views/login/index.vue"),
                },
            ],
        },
    ],
});

route.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) => {
    if (!userStore.isLogin && to.name != "login") {
        return { name: "login" };
    }
});

export default route;
