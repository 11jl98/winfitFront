import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://147.182.243.98:8055/'
})

http.interceptors.request.use((value) => {
    value.headers = {
        ...value.headers,
        Authorization: `Bearer free123`,
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization"

    }

    return value
})