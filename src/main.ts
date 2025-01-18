import "@/style/reset.css";
import "@/style/index.css";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import { createApp } from "vue";
import App from "@/App.vue";
import route from "@/router";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(ElementPlus, { locale: zhCn }).use(pinia).use(route).mount("#app");
