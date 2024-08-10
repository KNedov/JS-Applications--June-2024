// TODO update user service with user identity by project requirements
import { setUserData,clearUserData} from "../utils.js";
import  * as api  from "./api.js";
import { endpoints } from "./endPoints.js";
// TODO

async function login(email,password) {
    const result=await api.post (endpoints.login,{email,password})
    setUserData({
        _id:result._id,
        username:result.username,
        email: result.email,
        accessToken:result.accessToken
    })
}

async function register(username,email,password,gender) {
    const result=await api.post (endpoints.register,{username,
        email,
        password,
        gender
      })
    setUserData({
        _id:result._id,
        username:result.username,
        email: result.email,
        accessToken:result.accessToken,
        gender:result.gender
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