import { httpClient } from "@/apis/httpClient";
import pinia from "@/store/index";
import { userAppStore } from "@/store/appStore";

const userStore = userAppStore(pinia);

export type MenuItem = {
    id: number;
    parent_id: number;
    name: string;
    icon?: null | string;
    sort: number;
    children?: MenuItem[];
};

type Login = {
    nickname: string;
    accessToken: string;
    refreshToken: string;
    menus: MenuItem[];
};

export const doLogin = async (account: string, password: string): Promise<boolean> => {
    const rs = await httpClient.post<Login>("sys/user/login", { account, password });

    if (rs.data.code == 1000) {
        userStore.setIsLogin(true);
        userStore.setNickname(rs.data.data.nickname);
        userStore.setAccessToken(rs.data.data.accessToken);
        userStore.setRefreshToken(rs.data.data.refreshToken);
        console.log(rs.data.data.menus);
        userStore.setMenus(rs.data.data.menus);

        return true;
    } else {
        return false;
    }
};
