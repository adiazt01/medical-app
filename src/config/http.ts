import axios, { AxiosHeaders, AxiosHeaderValue, AxiosInstance, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://medical-app-backend-abf4.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const get = async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.get<T>(url);
    return response.data;
};

export const post = async <T>(url: string, data: any, headers?: (RawAxiosRequestHeaders ) | AxiosHeaders): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.post<T>(url, data, { headers });
    return response.data;
};


export const put = async <T>(url: string, data: any): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data);
    return response.data;
};

export const del = async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.delete<T>(url);
    return response.data;
};

export const patch = async <T>(url: string, data: any): Promise<T> => {
    const response = await axiosInstance.patch<T>(url, data);
    return response.data;
};

export const setToken = (token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
