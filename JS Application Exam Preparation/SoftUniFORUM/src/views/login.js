import { html } from '@lit/lit-html.js';
import { login } from '../data/users.js';
import { createSubmitHandler } from '../util.js';

const loginTemplate = (onLogin) => html`
<h1>Login</h1>
<form @submit=${onLogin}>
    <label>Username: <input type="text" name="username"></label>
    <label>Password: <input type="password" name="password"></label>
    <button>Log in</button>
    <p>Don't have an account? <a href="/register">Register here</a></p>
</form>`;

/** @type {import('..').SiteView} */
export function loginView(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    async function onLogin({ username, password }) {
        if (!username || !password) {
            return alert('Please enter both fields');
        }

        await login(username, password);

        ctx.page.redirect('/');
    }
}