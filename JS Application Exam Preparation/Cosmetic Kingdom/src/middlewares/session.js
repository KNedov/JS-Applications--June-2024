import { getUserData,getOwner} from '../utils.js';

export function addSession() {
    return function(ctx, next) {
        const userData = getUserData();
        const isOwner=getOwner()
        ctx.isOwner=isOwner
        ctx.userData = userData;

        next();
    };
}
