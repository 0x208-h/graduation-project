// //在index.js中引入axios
// import axios from 'axios';
// //引入qs模块，用来序列化post类型的数据
// import QS from 'qs';
// //antd的message提示组件，大家可根据自己的ui组件更改。
// import { message } from 'antd'

// //保存环境变量
// const isPrd = process.env.NODE_ENV === 'production';

// //区分开发环境还是生产环境基础URL
// export const basicUrl = 'http://127.0.0.1:8000'

// //设置axios基础路径
// const service = axios.create({
//   baseURL: basicUrl,
//   timeout: 2 * 60 * 60
// })

// // 请求拦截器
// service.interceptors.request.use(config => { 
//   // 每次发送请求之前本地存储中是否存在token，也可以通过Redux这里只演示通过本地拿到token
//   // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
//   // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
//   const token = window.localStorage.getItem('userToken') || window.sessionStorage.getItem('userToken');
//   //在每次的请求中添加token
//   config.data = Object.assign({}, config.data, {
//     token: `Bearer ${token}`,
//   })
//   //设置请求头
//   config.headers = {
//     'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
//   }
//   //序列化请求参数，不然post请求参数后台接收不正常
//   config.data = QS.stringify(config.data)
//   return config
// }, error => { 
//     return error;
// })

// // 响应拦截器
// service.interceptors.response.use(response => {
//   //根据返回不同的状态码做不同的事情
//   // 这里一定要和后台开发人员协商好统一的错误状态码
//   if (response.status) {
//     switch (response.status) {
//       case 200:
//         return response.data;
//       case 401:
//         //未登录处理方法
//         break;
//       case 403:
//         //token过期处理方法
//         break;
//       default:
//         message.error(response.data.msg)
//     }
//   } else { 
//     return response;
//   }
// })
// //最后把封装好的axios导出
// export default service


import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { message } from 'antd'

export interface IHttpClient {
  getStoreConfig: () => {
    baseURL: string
    headers: {
      token: string
    }
  }
  delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>,
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>
}

const GetStorage = (key: string): string => {
  const storage = window.localStorage
  if (storage.length !== 0) {
    return storage.getItem(key) || ''
  }
  return ''
}

const axiosConfig = {
  baseURL: '/api',
  headers: { token: GetStorage('token') }
}
const axiosInstance = axios.create(axiosConfig)
axiosInstance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      const res = response.data || response
      // if (res && res.data.status === 401) {
      //   message.error('登陆过期，请重新登录')
      //   return { reason: '登录过期，请重新登录' }
      // }
      return res
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)



const _http = axiosInstance
class Axios implements IHttpClient {
  public getStoreConfig() {
    return {
      baseURL: `http://127.0.0.1:8080`,
      headers: { token: GetStorage('token')}
    }
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const configInfo = config || this.getStoreConfig()
    const response: AxiosResponse = await _http.get(url, configInfo)
    return response as any
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const configInfo = config || this.getStoreConfig()
    const response: AxiosResponse = await _http.post(url, data, configInfo)
    return response as any
  }
  public async delete<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const configInfo = config || this.getStoreConfig()
    const response: AxiosResponse = await _http.delete(url, configInfo)
    return response as any
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const configInfo = config || this.getStoreConfig()
    const response: AxiosResponse = await _http.patch(url, data, configInfo)
    return response as any
  }
  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const configInfo = config || this.getStoreConfig()
    const response: AxiosResponse = await _http.put(url, data, configInfo)
    return response as any
  }
}

export const fetch: IHttpClient = new Axios()

