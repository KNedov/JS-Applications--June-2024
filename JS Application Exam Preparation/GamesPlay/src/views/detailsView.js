import { dataService } from "../data/dataService.js";

import { onDelete } from "./delete.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler, getOwner, getUserData } from "../utils.js";
// TODO TEMPLATE and bind ID for delete
const context = null;
const detailsTemp = (
  onComent,
  data,
  hasUser,
  coments,
  isOwner
) => html` <section id="game-details">
  <h1>Game Details</h1>
  <div class="info-section">
    <div class="game-header">
      <img class="game-img" src="${data.imageUrl}" />
      <h1>${data.title}</h1>
      <span class="levels">MaxLevel: ${data.MaxLevel}</span>
      <p class="type">${data.category}</p>
    </div>

    <p class="text">${data.summary}</p>

    <!-- Bonus ( for Guests and Users ) -->
    <div class="details-comments">
      <h2>Comments:</h2>

      <!-- list all comments for current game (If any) -->

      ${coments.length>0
        ? html`<ul>
            ${coments.map(p => html` <li class="comment"><p>Content: ${p.comment}</p></li>`)}
          </ul>`
        : html`<p class="no-comment">No comments.</p>`}
    </div>

    <!-- Edit/Delete buttons ( Only for creator of this game )  -->
    ${isOwner
      ? html`<div class="buttons">
          <a href="/edit/${data._id}" class="button">Edit</a>
          <a
            @click=${onDelete.bind(data._id)}
            href="javascript:void(0)"
            class="button"
            >Delete</a
          >
        </div>`
      : null}
  </div>

  <!-- Bonus -->
  <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->

  ${(() => {
    if (hasUser && !isOwner) {
      return html` <article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${onComent} class="form">
          <textarea name="comment" placeholder="Comment......"></textarea>
          <input class="btn submit" type="submit" value="Add Comment" />
        </form>
      </article>`;
    }
  })()}
</section>`;

export async function detailsView(ctx) {
  const _id = ctx.params._id;
  const [data, coments] = await Promise.all([
    dataService.details(_id),
    dataService.getComents(_id),
  ]);
  const hasUser = Boolean(getUserData());
  const isOwner = Boolean(getOwner(data));

  ctx.render(
    detailsTemp(createSubmitHandler(onComent), data, hasUser, coments, isOwner)
  );

  async function onComent(com) {
    
   const comment=com.comment
   if (!comment) {
    return window.alert("Field is required")
  }
   const gameId=_id
    const data = {gameId,comment };
    await dataService.postComent(data);

    ctx.page.redirect(`/details/${_id}`);
  }
}
