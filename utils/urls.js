import axios from "axios"

// const baseURL = "http://localhost:3001" // local
const baseURL = "http://142.93.208.13:3001/" // server

const Axios = axios.create({
    baseURL: baseURL,
})

export const api = async (url, type, data, headers) => {

    let requestTypes = [ 'get', 'post', 'put', 'delete' ]
    let requestType = requestTypes.find((reqType) => { return reqType === type })

    if(requestType){
        try{
            const response = await Axios({ method: requestType, url: url, data: data, headers: headers })
            return response
        }catch(e){
            return Promise.reject(e)
        }
    }else{
        return Promise.reject("invalid request type")
    }
}