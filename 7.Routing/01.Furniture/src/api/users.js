import { clearUserData, setUserData } from "../util.js";
import { get, post } from "./api.js";

const endpoints = {
  login: `/users/login`,
  register: `/users/register`,
  logout: `/users/logout`,
};

export async function login(data) {

  const resData = await post(endpoints.login, data);
  const userData = {
    email: resData.email,
    id: resData._id,
    accessToken: resData.accessToken,
  };
  setUserData(userData)
  
}

export async function register(data) {
 
  const resData = await post(endpoints.register, data);
  const userData = {
    email: resData.email,
    id: resData._id,
    accessToken: resData.accessToken,
  };
  setUserData(userData)
  
}

export async function logout() {
  get(endpoints.logout);
  clearUserData();  
}