import { html } from '@lit/lit-html.js';
import { createComment, getCommentsByPostId } from '../data/comments.js';
import { getPostById } from '../data/posts.js';
import { createSubmitHandler } from '../util.js';
import { commentTemplate } from './partials/comment.js';

const postsTemplate = (data, hasUser, isOwner, comments, onComment) => html`
<h2>${data.title}</h2>
<p>By ${data.author?.username}</p>
<p>${data.content}</p>
${
    isOwner ? html`<div>
        <a href="/edit/${data.objectId}">Edit post</a>
    </div>` : null
}
${
    hasUser ? html`<form @submit=${onComment}>
        <label>Add comment<textarea name="content"></textarea></label>
        <button>Publish</button>
    </form>` : null}
<section id="comment">
    <h3>Comments</h3>
    ${comments.map(commentTemplate)}
</section>`;

/** @type {import('..').SiteView} */
export async function postDetailsView(ctx) {
    ctx.showLoader();

    const postId = ctx.params.id;

    const [post, comments] = await Promise.all([
        getPostById(postId),
        getCommentsByPostId(postId)
    ]);

    const hasUser = Boolean(ctx.user);
    const isOwner = ctx.user?.objectId == post.author.objectId;

    ctx.hideLoader();
    ctx.render(postsTemplate(post, hasUser, isOwner, comments.results, createSubmitHandler(onComment)));

    async function onComment({ content }) {
        if (!content) {
            return alert('Comment cannot be blank');
        }

        const result = await createComment(content, postId, ctx.user?.objectId);
        ctx.page.redirect('/posts/' + postId);
    }
}