import { clearUserData } from "../utils.js";
import { userService } from "../data/userService.js";

export async function logoutAction(ctx) {
    const response = userService.logout();
    clearUserData();
    await response;
    ctx.page.replace('/dashboard');
}



