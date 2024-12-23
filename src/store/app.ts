import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * 基础配置中心
 */
export const useAppStore = defineStore("app", () => {
    const mobile = ref(false);
    function setMobile(is: boolean) {
        mobile.value = is;
    }
    return { mobile, setMobile };
});
