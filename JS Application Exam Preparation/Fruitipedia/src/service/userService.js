import{api} from "../api/api.js"
import{userHelper} from "../service/userHelper.js"
import {userEndpoints} from "./urls.js";

                            // TODO
async function register(option) {
    const response= await api.post(userEndpoints.register,option)
    userHelper.setUserData(response)
    return response
}
                        // TODO
async function login(option) {
    const response=await api.post(userEndpoints.login,option)
    userHelper.setUserData(response)
    return response
}

async function Logout(ctx) {
    debugger
    const response=await api.get(userEndpoints.Logout)
    userHelper.removeUserData()
    return response
  

}
export const userService={
    register,
    login,
    Logout
}