import { httpClient } from "./httpClient";

type MenuItem = {
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

export const Login = async (account: string, password: string): Promise<Login> => {
    const rs = await httpClient.get<Login>("test");
    return rs.data.data;
};
