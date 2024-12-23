import { defineStore } from "pinia";

interface UserInfo {
    token: string;
    id: number;
    account: string;
    nickname: string;
    accessToken: string;
    refreshToken: string;
}

/**
 * 基础配置中心
 */
const baseStore = defineStore("user", {
    state: () => ({
        user: null as UserInfo | null,
    }),
    getters: {
        getIsMobile(state) {
            return state.user;
        },
    },
    actions: {
        setUserInfo(user: UserInfo) {
            this.user = user;
        },
    },
});

export default baseStore;
