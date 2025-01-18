import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const createAPI = (config: AxiosRequestConfig): AxiosInstance => {
    const api = axios.create({
        ...config,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
            ...config.headers,
        },
    });

    // Interceptors for request
    api.interceptors.request.use(
        (requestConfig) => {
            // Example: Attach token if available
            const token = localStorage.getItem('authToken');
            if (token) {
                requestConfig.headers.Authorization = `Bearer ${token}`;
            }
            return requestConfig;
        },
        (error) => Promise.reject(error)
    );

    // Interceptors for response
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            // Example: Handle errors globally
            console.error('API Error:', error);
            return Promise.reject(error);
        }
    );

    return api;
};

export default createAPI;
