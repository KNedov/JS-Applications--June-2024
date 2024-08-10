import { dataService } from "../data/dataService.js";

import { onDelete } from "./delete.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
import { getOwner, getUserData } from "../utils.js";
// TODO TEMPLATE and bind ID for delete
const context = null;
const detailsTemp = (
  data,
  hasUser,
  likesInfo,
  isOwner,
  onLike
) => html` <section id="details-page" class="details">
  <div class="book-information">
    <h3>${data.title}</h3>
    <p class="type">Type: ${data.type}</p>
    <p class="img"><img src="${data.imageUrl}" /></p>
    <div class="actions">
      <!--Edit and Delete are only for creator-->
      ${hasUser
        ? buttonTemp(isOwner, data._id, likesInfo.hasLiked, onLike)
        : null}
      <div class="likes">
        <img class="hearts" src="/images/heart.png" />
        <span id="total-likes">Likes: ${likesInfo.likes}</span>
      </div>
      <!-- Bonus -->
    </div>
  </div>
  <div class="book-description">
    <h3>Description:</h3>
    <p>
    ${data.description}
    </p>
  </div>
</section>`;
const buttonTemp = (Owner, _id, hasLiked, onLike) => html`
  ${Owner
    ? html` <a class="button" href="/edit/${_id}" id="edit-btn">Edit</a>
        <a
          class="button"
          @click=${onDelete.bind(_id)}
          href="javascript:void(0)"
          id="delete-btn"
          >Delete</a
        >`
    : likeBtnTemp(hasLiked, onLike)}
`;

const likeBtnTemp = (hasLiked, onLike) =>
  html`${!hasLiked
    ? html`<a
        class="button"
        @click=${onLike}
        href="javascript:void(0)"
        id="like-btn"
        >Like</a
      >`
    : null}`;

export async function detailsView(ctx) {
  const _id = ctx.params._id;
  const [data, likesInfo] = await Promise.all([
    dataService.details(_id),
    dataService.getLikes(_id),
  ]);
  const hasUser = Boolean(getUserData());
  const isOwner = Boolean(getOwner(data));

  ctx.render(detailsTemp(data, hasUser, likesInfo, isOwner, onLike));

  async function onLike() {
    // TODO
    const id = { bookId: _id };
    await dataService.like(id);
    ctx.page.redirect(`/details/${_id}`);
  }
}
