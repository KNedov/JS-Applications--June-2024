import { dataService } from "../data/dataService.js";
import { getLikes, like } from "../data/likes.js";
import {render} from "../lib.js";
import { getUserData, getOwner } from "../utils.js";
import { onDelete } from "./logoutDel.js";
import page from "../../../node_modules/page/page.mjs";
import {html} from "../../../node_modules/lit-html/lit-html.js";

const detailsTemp = (data, hasUser,likesInfo, isOwner,onLike) => html` <section id="details">
  <div id="details-wrapper">
    <img id="details-img" src="${data.imageUrl}" alt="example1" />
    <div>
      <p id="details-category">${data.category}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p id="description">${data.description}</p>
          <p id="more-info">${data.moreInfo}</p>
        </div>
      </div>
      <h3>Is This Useful:<span id="likes">${likesInfo.likes}</span></h3>

      <!--Edit and Delete are only for creator-->
      ${hasUser ? buttonTemp(isOwner,data._id,likesInfo.hasLiked,onLike) : null}
    </div>
  </div>
</section>`;
const buttonTemp = (Owner,_id,hasLiked,onLike) => html`
  <div id="action-buttons">
    ${Owner
      ? html`<a href="/edit/${_id}" id="edit-btn">Edit</a>
          <a @click=${onDelete.bind(_id)} href="javascript:void(0)" id="delete-btn">Delete</a>`
      : likeBtnTemp(hasLiked,onLike)}
  </div>
`;

const likeBtnTemp=(hasLiked,onLike)=>
html`${!hasLiked?html`<a @click=${onLike}  href="javascript:void(0)" id="like-btn">Like</a>`:null}`


export async function detailsView(ctx) {
  const _id = ctx.params._id
  const [data,likesInfo] = await Promise.all([
    dataService.details(_id),
    getLikes(_id)
  ])
  const hasUser = Boolean(getUserData())
  const isOwner = Boolean(getOwner(data))
  const hasLikes=likesInfo
  render(detailsTemp(data, hasUser,likesInfo, isOwner,onLike));

  async function onLike() {
    await like(_id)
    page.redirect(`/details/${_id}`)
  }
}

