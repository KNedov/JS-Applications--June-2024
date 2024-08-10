import { html } from '@lit/lit-html.js';

export const navTemplate = (username, isAdmin) => html`
<a href="/">Home</a>
<a href="/posts">Posts</a>
${username ? userNav(username) : guestNav()}
`;

const guestNav = () => html`
<a href="/login">Login</a>
<a href="/register">Register</a>`;

const userNav = (username) => html`
<span class="greeting">Logged in as ${username} <a href="/logout">Logout</a></span>`;