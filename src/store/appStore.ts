import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { type MenuItem } from "@/apis/login";

/**
 * 用户信息
 */
export const useAppStore = defineStore(
    "appStore",
    () => {
        // 是否登录
        const isLogin = ref<boolean>(false);
        const setIsLogin = (is: boolean) => {
            isLogin.value = is;
        };

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
        const menus = reactive<Array<MenuItem>>([]);
        const setMenus = (ms: MenuItem[]) => {
            for (const menu of ms) {
                menus.push(menu);
            }
        };

        // set empty
        const setEmpty = () => {
            setIsLogin(false);
            setNickname("");
            setAccessToken("");
            setRefreshToken("");
            setMenus([]);
        };

        return {
            isLogin,
            setIsLogin,
            nickname,
            setNickname,
            accessToken,
            setAccessToken,
            refreshToken,
            setRefreshToken,
            menus,
            setMenus,
            setEmpty,
        };
    },
    {
        persist: true,
    }
);
