import axios from "axios";
import { queryClean } from "./util";

const GetStorage = (key: string): string => {
  const storage = window.localStorage;
  if (storage.length !== 0) {
    return storage.getItem(key) || "";
  }
  return "";
};

const axiosConfig = {
  baseURL: "http://127.0.0.1:8080/api",
  headers: { authorization: GetStorage("token") },
};

const axiosInstance = axios.create(axiosConfig);
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      const res = response.data || response;
      return res;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function queryApi<T>(url: string, query?: any): Promise<T> {
  return axiosInstance({
    method: "get",
    url,
    params: queryClean(query),
  })
    .then((res) => res.data)
    .catch();
}

export function postApi<T>(url: string, data?: any): Promise<T> {
  return axiosInstance({
    method: "post",
    url,
    data: data instanceof Array ? data : queryClean(data),
  })
    .then((res) => res.data)
    .catch();
}

export function putApi<T>(url: string, data?: any): Promise<T> {
  return axiosInstance({
    method: "put",
    url,
    data: data instanceof Array ? data : queryClean(data),
  })
    .then((res) => res.data)
    .catch();
}

export function deleteApi<T>(url: string, query?: any): Promise<T> {
  return axiosInstance({
    method: "delete",
    url,
    params: queryClean(query),
  })
    .then((res) => res.data)
    .catch();
}
