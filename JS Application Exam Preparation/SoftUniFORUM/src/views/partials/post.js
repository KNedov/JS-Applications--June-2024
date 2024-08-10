import { html } from '@lit/lit-html.js';

export const postPreviewTemplate = (data) => html`
<li>
    <a href="/posts/${data.objectId}"><strong>${data.title}</strong></a>
</li>`;