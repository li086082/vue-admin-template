import { post, get } from "@/apis/httpClient";
import type { MenuItem } from "@/apis/login";

export type userListType = {
    id: number;
    account: string;
    status: number;
    nickname: string;
    avatar?: string;
    page?: string;
    created_at?: string;
    updated_at?: string;
};

export type useListWithTotalType = {
    list: userListType[];
    total: number;
};

export type editUserType = {
    uid: number;
    nickname: string;
    status: string | number;
    password: string;
    page: string | undefined;
};

export type userSearchType = {
    nickname: string;
    status: number | string;
};

export type userAddType = {
    account: string;
    password: string;
    nickname: string;
};

export type menusType = {
    menus: MenuItem[];
    auth: number[];
};

export const userList = async (nickname: string, status: number | string, page: number, size: number) => {
    let uri = `/api/sys/user/list?page=${page}&size=${size}`;
    if (nickname) {
        uri += `&nickname=${nickname}`;
    }
    if (status === 0 || status === 1) {
        uri += `&status=${status}`;
    }
    const rs = await get<useListWithTotalType>(uri);
    return rs.data.data;
};

export const userEdit = async (data: editUserType) => {
    const uri = `/api/sys/user/update`;
    const rs = await post(uri, data);
    return rs.data.data;
};

export const userAdd = async (user: userAddType) => {
    const uri = `/api/sys/user/add`;
    const rs = await post(uri, user);
    return rs.data.data;
};

export const userMenus = async (uid: number) => {
    const uri = `/api/sys/user/menus?uid=${uid}`;
    const rs = await get<menusType>(uri);
    return rs.data.data;
};

export const userAuth = async (uid: number, auths: number[]) => {
    const uri = `/api/sys/user/auth`;
    const rs = await post(uri, { uid, menus: auths });
    return rs.data.data;
};
