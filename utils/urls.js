import axios from "axios"
import { toast } from "react-hot-toast"

// export const baseURL = "http://localhost:3001" // local
// const baseURL = "http://142.93.208.13:3001/" // server
export const baseURL = "https://civil-guruji-api.onrender.com" // server

const Axios = axios.create({
    baseURL: baseURL,
})

export const api = async (url, type, data, headers, options = {}) => {

    let requestTypes = ['get', 'post', 'put', 'delete']
    let requestType = requestTypes.find((reqType) => { return reqType === type })

    if (requestType) {
        try {
            const response = await Axios({
                method: requestType,
                url: url,
                data: data,
                headers: {
                    ...headers,
                    'x-access-token': localStorage.getItem('accessToken')
                },
                ...options
            })
            return response
        } catch (e) {

            if (e?.response?.status == 403) {
                try {

                    let refreshResponse = await Axios.get('/token/refresh', {
                        headers: {
                            'x-refresh-token': localStorage.getItem('refreshToken')
                        }
                    })

                    if (refreshResponse?.data?.access_token) {
                        localStorage.setItem('accessToken', refreshResponse?.data?.access_token)
                        return await api(url, type, data, headers, options)
                    } else {
                        // expired refresh token
                        toast.error("Unauthorized")
                        localStorage.removeItem('accessToken')
                        localStorage.removeItem('refreshToken')
                        if (!(document.location.pathname == '/login')) {
                            document.location.href = '/login'
                        }
                        return Promise.reject(e)
                    }

                } catch (error) {
                    toast.error("Unauthorized")
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')
                    if (!(document.location.pathname == '/login')) {
                        document.location.href = '/login'
                    }
                    return Promise.reject(e)
                }
            } else {
                return Promise.reject(e)
            }

        }
    } else {
        return Promise.reject("invalid request type")
    }
}