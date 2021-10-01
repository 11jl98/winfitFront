import axios from 'axios'

export const httpEmpresa = axios.create({
    baseURL: 'http://192.168.5.124:3333/'
})

httpEmpresa.interceptors.request.use((value) => {
    value.headers = {
        ...value.headers,
        Authorization: `bearer MQ.VPAh4VR5H2-2kUPusrIuoylYwyinzqjEZcCoXY82QY8aeptNaBFx8E-7GC-Y`,
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization"

    }

    return value
})