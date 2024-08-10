// TODO update user service with user identity by project requirements
import { setUserData,clearUserData} from "../utils.js";
import  * as api  from "./api.js";
import { endpoints } from "./endpoints.js";


async function login(username,password) {
    const result=await api.post (endpoints.login,{username,password})
    setUserData({
        _id:result._id,
        username: result.username,
        accessToken:result.accessToken
    })
}

async function register(username,password) {
    const result=await api.post (endpoints.register,{username,password})
    setUserData({
        _id:result._id,
        username: result.username,
        accessToken:result.accessToken
    })
}

async function logout() {
   const promise= api.get(endpoints.logout)
    clearUserData()
    await promise
}

export const userService={
    login,
    register,
    logout
}