import { post, get } from "@/apis/httpClient";

export enum menuTypeEnum {
    isMenu = 1,
    isApi = 2,
}

export type menuEidtParentIdType = {
    value: string;
    label: string;
};

export type menu = {
    id: number;
    parent_id: number;
    name: string;
    action: string;
    icon?: string;
    type: menuTypeEnum;
    sort: number;
    route: string;
    created_at?: string;
    updated_at?: string;
};

export type menuListType = {
    list: menu[];
    total: number;
};

export type menuSearchType = {
    name?: string;
    type?: menuListType;
};

export type menuAdd = {
    parent_id: number;
    name: string;
    action: string;
    icon?: string;
    type: menuTypeEnum;
    sort: number;
    route?: string;
};

export const menuList = async (page: number, size: number, search: menuSearchType) => {
    let uri = `/api/sys/menu/list?page=${page}&size=${size}`;
    if (search.name != undefined) {
        uri += `&name=${search.name.trim()}`;
    }
    if (search.type != undefined) {
        uri += `&type=${search.type}`;
    }
    const rs = await get<menuListType>(uri);
    return rs.data.data;
};

export const menuEdit = async (m: menu) => {
    let uri = "/api/sys/menu/edit";
    const rs = await post(uri, m);
    return rs.data.data;
};

export const menuAdd = async (m: menuAdd) => {
    let uri = "/api/sys/menu/add";
    const rs = await post(uri, m);
    return rs.data.data;
};
