import { getUserData } from "../utils.js";
import  * as api  from "./api.js";

export const likeEndpoints = {
    like: "/data/useful",
    likesByCharacterId:(detailsId)=>`/data/useful?where=characterId%3D%22${detailsId}%22&distinct=_ownerId&count`,
    likesByUserId:(detailsId,userId)=>`/data/useful?where=characterId%3D%22${detailsId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
  };

export async function like(characterId) {
    return api.post(likeEndpoints.like,{characterId})
}
export async function getLikes(detailsId) {
    const userData=getUserData()

    const requests=[api.get(likeEndpoints.likesByCharacterId(detailsId))]
    if (userData) {
        requests.push(api.get(likeEndpoints.likesByUserId(detailsId,userData._id)))
    }
    const [likes,hasLiked]=await Promise.all(requests)
    return{
        likes,
        hasLiked:Boolean(hasLiked)
    }
}