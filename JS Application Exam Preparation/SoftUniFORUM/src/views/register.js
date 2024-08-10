import { html } from '@lit/lit-html.js';
import { register } from '../data/users.js';
import { createSubmitHandler } from '../util.js';

const registerTemplate = (onRegister) => html`
<h1>Register</h1>
<form @submit=${onRegister}>
    <label>Username: <input type="text" name="username"></label>
    <label>Password: <input type="password" name="password"></label>
    <label>Repeat: <input type="password" name="repass"></label>
    <button>Sign up</button>
    <p>Already registered? <a href="/login">Login here</a></p>
</form>`;

/** @type {import('..').SiteView} */
export function registerView(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister({ username, password, repass }) {
        if (!username || !password) {
            return alert('Please enter both fields');
        }
        if (password != repass) {
            return alert('Passwords don\'t match');
        }

        await register(username, password);

        ctx.page.redirect('/');
    }
}