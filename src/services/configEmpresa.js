import axios from 'axios'

export const httpEmpresa = axios.create({
    baseURL: 'http://192.168.5.124:3333/'
})

httpEmpresa.interceptors.request.use((value) => {
    value.headers = {
        ...value.headers,
        Authorization: `bearer MQ.57s-MhNqbfxyeVCpXvU2XIdFYrjLqGz79bYXQnvu7RbDMJokoRQWxeOBswEI`,
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization"

    }

    return value
})