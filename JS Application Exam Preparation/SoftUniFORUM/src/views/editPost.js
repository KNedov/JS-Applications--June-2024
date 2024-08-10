import { html } from '@lit/lit-html.js';
import { getPostById, updatePost } from '../data/posts.js';
import { createSubmitHandler } from '../util.js';

const editPostTemplate = (postData, onSubmit) => html`
<h1>Edit post</h1>
<form @submit=${onSubmit}>
    <label>Title: <input type="text" name="title" .value=${postData.title}></label>
    <label>Content:<textarea name="content" .value=${postData.content}></textarea></label>
    <button>Save changes</button>
</form>`;

/** @type {import('../index.js').SiteView} */
export async function editPostView(ctx) {
    ctx.showLoader();

    const id = ctx.params.id;

    const postData = await getPostById(id);

    ctx.hideLoader();
    ctx.render(editPostTemplate(postData, createSubmitHandler(onSubmit)));

    async function onSubmit({ title, content }) {
        if (!title || !content) {
            return alert('All fields are required');
        }

        const result = await updatePost(id, { title, content }, postData.author.objectId);

        ctx.page.redirect('/posts/' + id);
    }
}