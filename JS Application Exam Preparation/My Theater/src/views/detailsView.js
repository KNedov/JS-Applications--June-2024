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
) => html` 
<section id="detailsPage">
  <div id="detailsBox">
    <div class="detailsInfo">
      <h1>Title: ${data.title}</h1>
      <div>
        <img src="${data.imageUrl}" />
      </div>
    </div>

    <div class="details">
      <h3>Theater Description</h3>
      <p>${data.description}</p>
      <h4>Date: ${data.date}</h4>
      <h4>Author: ${data.author}</h4>
      <!--Edit and Delete are only for creator-->
      <div class="buttons">
        ${hasUser
          ? buttonTemp(isOwner, data._id, likesInfo.hasLiked, onLike)
          : null}
          
      </div>
      <p class="likes">Likes: ${likesInfo.likes}</p>
    </div>
  </div>
</section>`;
const buttonTemp = (Owner, _id, hasLiked, onLike) => html`
  ${Owner
    ? html` 
    <a @click=${onDelete.bind(_id)}class="btn-delete"href="javascript:void(0)">Delete</a>
    <a class="btn-edit" href="/edit/${_id}">Edit</a>`
    : likeBtnTemp(hasLiked, onLike)}
`;

const likeBtnTemp = (hasLiked, onLike) =>
  html`${!hasLiked
    ? html`<a @click= ${onLike} class="btn-like" href="javascript:void(0)">Like</a>`
    : null}`;

export async function detailsView(ctx) {
  const theaterId = ctx.params._id;
  const [data, likesInfo] = await Promise.all([
    dataService.details(theaterId),
    dataService.getLikes(theaterId),
  ]);
  const hasUser = Boolean(getUserData());
  console.log(data);
  debugger
  const isOwner = Boolean(getOwner(data));

  ctx.render(detailsTemp(data, hasUser, likesInfo, isOwner, onLike));

  async function onLike() {
    const like = {
      theaterId,
  }
    ;
    const data=await dataService.like(like);
  console.log(data);
  
    ctx.page.redirect(`/details/${theaterId}`);
  }
}
