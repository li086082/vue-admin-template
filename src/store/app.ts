import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * 基础配置中心
 */
export const useAppStore = defineStore("app", () => {
    const appName = ref("管理系统");
    function setAppName(name: string) {
        appName.value = name;
    }

    const mobile = ref(false);
    function setMobile(is: boolean) {
        mobile.value = is;
    }

    const navStatus = ref<boolean>(false);
    function setNavStatus() {
        navStatus.value = !navStatus.value;
    }

    return { appName, setAppName, mobile, setMobile, navStatus, setNavStatus };
});
