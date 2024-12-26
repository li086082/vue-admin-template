import "@/style/reset.css";
import "@/style/index.css";
import "element-plus/dist/index.css";

import { createApp } from "vue";
import App from "@/App.vue";
import route from "@/router";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(pinia).use(ElementPlus).use(route).mount("#app");
