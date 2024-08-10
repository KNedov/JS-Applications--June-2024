import { html } from '@lit/lit-html.js';
import { createPost } from '../data/posts.js';
import { createSubmitHandler } from '../util.js';

const createPostTemplate = (onSubmit) => html`
<h1>Create new post</h1>
<form @submit=${onSubmit}>
    <label>Title: <input type="text" name="title"></label>
    <label>Content:<textarea name="content"></textarea></label>
    <button>Publish</button>
</form>`;

/** @type {import('../index.js').SiteView} */
export function createPostView(ctx) {
    ctx.render(createPostTemplate(createSubmitHandler(onSubmit)));

    async function onSubmit({ title, content }) {
        if (!title || !content) {
            return alert('All fields are required');
        }

        const result = await createPost({ title, content }, ctx.user?.objectId);

        ctx.page.redirect('/posts/' + result.objectId);
    }
}