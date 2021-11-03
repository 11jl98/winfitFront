import axios from 'axios'

export const httpEmpresa = axios.create({
    baseURL: 'http://192.168.5.124:3333/'
})

httpEmpresa.interceptors.request.use((config) => {
        try {
            const token = sessionStorage.getItem('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        } catch (error) {
            console.log(error)
        }
})