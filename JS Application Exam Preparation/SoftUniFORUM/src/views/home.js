import { html } from '@lit/lit-html.js';

const homeTemplate = () => html`
<h1>Welcome to SoftUni Forum!</h1>
<p>Contribute to posts related to JavaScript programming. <a href="/posts">Browse all posts</a></p>`;

/** @type {import('..').SiteView} */
export function homeView(ctx) {
    ctx.render(homeTemplate());
}