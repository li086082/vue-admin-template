import "element-plus/dist/index.css";
import "@/style.css";

import { createApp } from "vue";
import App from "@/App.vue";
import route from "@/router";
import ElementPlus from "element-plus";

createApp(App).use(ElementPlus).use(route).mount("#app");
