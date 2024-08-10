import { getUserData } from "../utils.js";
import  * as api  from "./api.js";
// TODO
export const endpoints = {
    buy: "/data/bought",
    getTotalBuy:(productId)=>`/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`,
    getForUserBuy:(productId,userId)=>`/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
  };

export async function buy(productId) {
    return api.post(endpoints.buy,{productId})
}
export async function getBuyData(productId) {
    const userData=getUserData()

    const requests=[api.get(endpoints.getTotalBuy(productId))]
    if (userData) {
        requests.push(api.get(endpoints.getForUserBuy(productId,userData._id)))
    }
    const [buy,isBuy]=await Promise.all(requests)
    return{
        buy,
        isBuy:Boolean(isBuy)
    }
}