import { userHelper } from "../service/userHelper.js";


  /*ADD BASE URL*/
const baseURL='http://localhost:3030/'
  async function requester(url, method, data) {
    const option = {
      method,
      headers: {},
    };
    const userData = userHelper.getUserData();

    if (userData) {
      option.headers["x-authorization"] = userData.accessToken;
    }
    if (data) {
      option.headers["Content-Type"] = "application/json";
      option.body = JSON.stringify(data);
    }
    try {
      const response = await fetch(baseURL+url, option);
      if (!response.ok) {
        const error = await response.json();

        if (response.status == 403 && error.message == 'Invalid access token') {
         
        }

        throw new Error(error.message);
    }

    if (response.status == 204) {
        return response;
    } else {
        return response.json();
    }
    } catch (err) {
      alert(err.message);
      throw err.message;
    }
  };
async function get(url) {
  return await requester(url, "GET");
}
async function post(url, data) {
  return await requester(url, "POST", data);
}
async function put(url, data) {
  return await requester(url, "PUT", data);
}
async function del(url) {
  return await requester(url, "DELETE");
}
export const api={
    get,
    post,
    put,
    del
}