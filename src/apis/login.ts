import { post, get } from "@/apis/httpClient";

export type MenuItem = {
    id: number;
    parent_id: number;
    name: string;
    icon?: null | string;
    sort: number;
    route: string;
    children?: MenuItem[];
};

export type Login = {
    nickname: string;
    accessToken: string;
    refreshToken: string;
    menus: MenuItem[];
};

export const doLogin = async (account: string, password: string): Promise<Login> => {
    const rs = await post<Login>("/api/sys/user/login", { account, password });
    return rs.data.data;
};

export const doLogout = async (): Promise<any> => {
    const rs = await get("/api/sys/user/logout");
    return rs.data.data;
};
