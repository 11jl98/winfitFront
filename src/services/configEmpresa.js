import axios from 'axios'

export const httpEmpresa = axios.create({
    baseURL: 'http://167.172.137.192:3333/'
})

httpEmpresa.interceptors.request.use((value) => {
    value.headers = {
        ...value.headers,
        Authorization: `bearer MQ.xJluz4xlep0c6ppKNAiEKxu1BhNn25-YFXKRO9n_CS9vAqR7aIwSLz5q-DSp`,
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization"

    }

    return value
})