import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

import { ElMessage } from "element-plus";

interface Response<T = any> {
    code: number;
    message: string;
    data: T;
}

class HttpClient {
    /**
     * 后端域名
     */
    host: string = "http://backend.issue.com/";

    /**
     * axios实例
     */
    axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: this.host,
            timeout: 3000,
        });

        this.axiosClient.interceptors.request.use(
            function (config: InternalAxiosRequestConfig) {
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
            (error: AxiosError) => {
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
