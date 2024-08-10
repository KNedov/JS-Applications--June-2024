
import { userHelper } from "../service/userHelper.js";

const root = document.querySelector("main");

export function authMiddleware(ctx,next) {
    ctx.userData=userHelper.getUserData();
    next();
}