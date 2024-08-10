// TODO update user service with user identity by project requirements
import { setUserData,clearUserData} from "../util.js";
import  * as api  from "./api.js";

const userEndpoints={
    login:'/users/login',
    register:'/users/register',
    logout:'/users/logout'
}
async function login(email,password) {
    const result=await api.post (userEndpoints.login,{email,password})
    setUserData({
        _id:result._id,
        email: result.email,
        accessToken:result.accessToken
    })
}

async function register(email,password) {
    const result=await api.post (userEndpoints.register,{email,password})
    setUserData({
        _id:result._id,
        email: result.email,
        accessToken:result.accessToken
    })
}

async function logout() {
   const promise= api.get(userEndpoints.logout)
    clearUserData()
    await promise
}

export const userService={
    login,
    register,
    logout
}