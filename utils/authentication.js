const { api } = require("./urls")

export const refreshUser = async (from) => {

    try {

        console.log(from)

        let access_token = localStorage.getItem('accessToken')
        let refresh_token = localStorage.getItem('refreshToken')
        console.log(access_token, refresh_token)
        if (access_token && refresh_token) {
            const response = await api('/user/login/token/access', 'get', {}, {
                'x-access-token': access_token
            })
            if(response){
                return Promise.resolve(response)
            }else{
                return Promise.reject()
            }
        }else {
            window.location.href = '/login'
        }



    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}