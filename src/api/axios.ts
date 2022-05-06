import axios, { AxiosError, AxiosRequestConfig } from 'axios'

declare module 'axios' {
  export interface AxiosInstance {
    request<T>(config: AxiosRequestConfig): Promise<T>
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
    head<T>(url: string, config?: AxiosRequestConfig): Promise<T>
    post<T, B>(url: string, data?: B, config?: AxiosRequestConfig): Promise<T>
    put<T, B>(url: string, data?: B, config?: AxiosRequestConfig): Promise<T>
    patch<T, B>(url: string, data?: B, config?: AxiosRequestConfig): Promise<T>
  }
}

export type Config = Pick<
  AxiosRequestConfig,
  'baseURL' | 'cancelToken' | 'timeout' | 'headers' | 'withCredentials'
>

export const client = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token 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`,
  },
})

client.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<{ message: string }>) => {
    throw error.response?.data.message
  }
)
