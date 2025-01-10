import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

import { ElMessage } from "element-plus";
import { useAppStore } from "@/store/appStore";

interface Response<T = any> {
    code: number;
    message: string;
    data: T;
}

type refreshTokenResponseType = {
    accessToken: string;
    refreshToken: string;
};

class HttpClient {
    /**
     * axios实例
     */
    axiosClient: AxiosInstance;

    /**
     * 是否正在刷新
     */
    isRefresing: boolean = false;

    /**
     * 挂起请求超时链接
     */
    requestQueue: { config: InternalAxiosRequestConfig; resolve: any }[] = [];

    constructor() {
        this.axiosClient = axios.create({
            timeout: 3000,
        });

        this.axiosClient.interceptors.request.use(
            function (config: InternalAxiosRequestConfig) {
                const appStore = useAppStore();
                if (appStore.isLogin && appStore.accessToken) {
                    config.headers.Authorization = appStore.accessToken;
                }
                return config;
            },
            function (error: AxiosError) {
                return Promise.reject(error);
            }
        );

        // 请求拦截器
        this.axiosClient.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                return config;
            },
            (error: AxiosError) => {
                console.log("全局请求失败的拦截", error);
                return Promise.reject(error);
            }
        );

        // 添加响应拦截器
        this.axiosClient.interceptors.response.use(
            (response: AxiosResponse<Response>) => {
                if (response.status == 200 && response.data.code == 1000) {
                    return response;
                } else {
                    ElMessage.error(response.data.message);
                    return Promise.reject(response.data.message);
                }
            },
            async (error: AxiosError) => {
                if (error.status == 401) {
                    return new Promise(async (resolve) => {
                        const { config } = error;
                        if (config == undefined) {
                            return;
                        }
                        // 将请求挂起
                        this.requestQueue.push({ config, resolve });
                        if (this.isRefresing) {
                            return;
                        }
                        // 无感刷新token
                        const appStore = useAppStore();
                        if (!appStore.refreshToken) {
                            appStore.setEmpty();
                            return;
                        }
                        this.isRefresing = true;
                        const newToken = await this.post<refreshTokenResponseType>("/api/sys/user/refresh", {
                            refreshToken: appStore.refreshToken,
                        });
                        appStore.setAccessToken(newToken.data.data.accessToken);
                        appStore.setRefreshToken(newToken.data.data.refreshToken);
                        this.isRefresing = false;

                        // 从新执行请求
                        for (const { config, resolve } of this.requestQueue) {
                            resolve(this.axiosClient(config));
                        }
                    });
                }
                return Promise.reject(error);
            }
        );
    }

    /**
     * get请求
     * @param uri 请求uri
     * @returns
     */
    public get<T>(uri: string): Promise<AxiosResponse<Response<T>, any>> {
        return this.axiosClient.get<Response<T>>(uri);
    }

    /**
     * post请求
     * @param uri 请求uri
     * @param data 数据
     * @returns
     */
    public post<T>(uri: string, data?: any): Promise<AxiosResponse<Response<T>, any>> {
        return this.axiosClient.post<Response<T>>(uri, data);
    }
}

export const httpClient = new HttpClient();
