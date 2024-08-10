import { dataService } from "../data/dataService.js";


import { onDelete } from "./delete.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
import { getOwner,getUserData } from "../utils.js";
// TODO TEMPLATE and bind ID for delete
const context=null
const detailsTemp = (data, hasUser,likesInfo, isOwner,onLike) => html`
<section id="details">
          <div id="details-wrapper">
            <img
              id="details-img"
              src="${data.imageUrl}"
              alt="example1"
            />
            <div>
              <p id="details-type">${data.type}</p>
              <div id="info-wrapper">
                <div id="details-description">
                  <p id="description">
                    ${data.description}
                  </p>
                  <p id="more-info">
                    ${data.learnMore}
                  </p>
                </div>
              </div>
              <h3>Like Solution:<span id="like">${likesInfo.likes}</span></h3>

      <!--Edit and Delete are only for creator-->
      ${hasUser ? buttonTemp(isOwner,data._id,likesInfo.hasLiked,onLike) : null}
    </div>
  </div>
</section>`;
const buttonTemp = (Owner,_id,hasLiked,onLike) => html`
  <div id="action-buttons">
    ${Owner
      ? html`
      <a href="/edit/${_id}" id="edit-btn">Edit</a>
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
    dataService.getLikes(_id)
  ])
  const hasUser = Boolean(getUserData())
  const isOwner = Boolean(getOwner(data))
  
  ctx.render(detailsTemp(data, hasUser,likesInfo, isOwner,onLike));

  async function onLike() {
    // TODO
    const id={solutionId:_id}
    await dataService.like(id)
    ctx.page.redirect(`/details/${_id}`)
  }
}

