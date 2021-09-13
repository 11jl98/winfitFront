import axios from 'axios'

export const httpEmpresa = axios.create({
    baseURL: 'http://192.168.5.124:3333/'
})

httpEmpresa.interceptors.request.use((value) => {
    value.headers = {
        ...value.headers,
        Authorization: `bearer Mw.vP8cfZEHbZv8dIofSRTQ8zbEwsDRP0JQYzMgZbPY9zjLSmpj088wg12dLGOF`,
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization"

    }

    return value
})