import "@/style/reset.css";
import "@/style/index.css";
import "element-plus/dist/index.css";

import { createApp } from "vue";
import App from "@/App.vue";
import route from "@/router";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(ElementPlus).use(pinia).use(route).mount("#app");
