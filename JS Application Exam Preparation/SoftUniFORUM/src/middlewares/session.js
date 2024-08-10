import { getUserData } from '../util.js';

export function addSession() {
    return function(ctx, next) {
        const user = getUserData();

        ctx.user = user;

        next();
    };
}