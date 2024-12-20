import {
    createRouter,
    createWebHistory,
    type Router,
    type RouteRecordRaw,
} from "vue-router";

const route: Router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: () => import("@/views/layout/index.vue"),
        },
    ],
});

export default route;
