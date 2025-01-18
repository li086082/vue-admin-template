import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

import { ElMessage } from "element-plus";
import { useAppStore } from "@/store/appStore";
import router from "@/router/index";

interface Response<T = any> {
    code: number;
    message: string;
    data: T;
}

type refreshTokenResponseType = {
    accessToken: string;
    refreshToken: string;
};

const httpClient: AxiosInstance = axios.create({
    timeout: 5000,
});

httpClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const appStore = useAppStore();
        if (appStore.isLogin && appStore.accessToken) {
            config.headers.Authorization = appStore.accessToken;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// 挂起请求是否正在重试
let isRefresing: boolean = false;
// 请求挂起队列
let requestQueue: { config: InternalAxiosRequestConfig; resolve: any }[] = [];
// 添加响应拦截器
httpClient.interceptors.response.use(
    (response: AxiosResponse<Response>) => {
        if (response.status == 200 && response.data.code == 1000) {
            return response;
        } else if (response.data.code == 1008) {
            const appStore = useAppStore();
            appStore.setEmpty();
            router.replace({ name: "login" });
        }

        ElMessage.error(response.data.message);
        return Promise.reject(response.data.message);
    },
    async (error: AxiosError) => {
        if (error.status == 401) {
            return new Promise((resolve) => {
                const { config } = error;
                if (config == undefined) {
                    return;
                }
                // 将请求挂起
                requestQueue.push({ config, resolve });
                if (isRefresing) {
                    return;
                }
                // 无感刷新token
                const appStore = useAppStore();
                if (!appStore.refreshToken) {
                    appStore.setEmpty();
                    return;
                }

                isRefresing = true;
                post<refreshTokenResponseType>("/api/sys/user/refresh", {
                    refreshToken: appStore.refreshToken,
                })
                    .then(
                        (resp) => {
                            if (resp.data.code == 1000) {
                                appStore.setAccessToken(resp.data.data.accessToken);
                                appStore.setRefreshToken(resp.data.data.refreshToken);
                                // 从新执行请求
                                for (const { config, resolve } of requestQueue) {
                                    resolve(httpClient(config));
                                }
                            }
                        },
                        (err) => {
                            console.log(err);
                        }
                    )
                    .finally(() => {
                        isRefresing = false;
                    });
            });
        }
        return Promise.reject(error);
    }
);

/**
 * get请求
 * @param uri 请求uri
 * @returns
 */
export function get<T>(uri: string): Promise<AxiosResponse<Response<T>, any>> {
    return httpClient.get<Response<T>>(uri);
}

/**
 * post请求
 * @param uri 请求uri
 * @param data 数据
 * @returns
 */
export function post<T>(uri: string, data?: any): Promise<AxiosResponse<Response<T>, any>> {
    return httpClient.post<Response<T>>(uri, data);
}
