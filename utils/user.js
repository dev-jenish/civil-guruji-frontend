import { toast } from "react-hot-toast"
import { api } from "./urls"



export const updateUserDetails = async (userData, setUserData) => {

    try{
        let response = await api(`/user/details/${userData?._id}`, 'get')
        if(response?.data?._id){
            setUserData(response?.data)
        }
    }catch(error){
        console.log(error)
        toast.error('Error happned while updating user data!')
    }
}