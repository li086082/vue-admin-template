import { defineStore } from "pinia";
import { ref, reactive } from "vue";

/**
 * 用户信息
 */
export const useStore = defineStore("user", () => {
    // 昵称
    const nickname = ref<string>("");
    const setNickname = (name: string) => {
        nickname.value = name;
    };

    // access_token
    const accessToken = ref<string>("");
    const setAccessToken = (token: string) => {
        accessToken.value = token;
    };

    // refresh_token
    const refreshToken = ref<string>("");
    const setRefreshToken = (token: string) => {
        refreshToken.value = token;
    };

    // menus
    const menus = reactive<Array<any>>([]);
    const setMenus = (menus: Array<any>) => {
        menus.push(...menus);
    };

    return {
        nickname,
        setNickname,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        menus,
        setMenus,
    };
});
