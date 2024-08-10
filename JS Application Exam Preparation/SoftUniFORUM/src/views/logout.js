import { logout } from '../data/users.js';

export async function logoutAction(ctx) {
    await logout();

    ctx.page.replace('/');
}