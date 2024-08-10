import { html } from '@lit/lit-html.js';

export const commentTemplate = (data) => html`
<article class="comment">
    <main>
        ${data.content}
    </main>
    <footer>By ${data.author.username}</footer>
</article>`;