import { dataService } from "../data/dataService.js";


import { onDelete } from "./delete.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
import { getOwner,getUserData } from "../utils.js";
// TODO TEMPLATE and bind ID for delete
const context=null
const detailsTemp = (data, hasUser,goingInfo, isOwner,onGoing) => html`
  <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${data.imageUrl}" alt="example1" />
            <p id="details-title">${data.name}</p>
            <p id="details-category">
              Category: <span id="categories">${data.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${data.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span
                  >${data.description}</span>
              </div>

            </div>
            <h3>Going: <span id="go">${goingInfo.goingCount}</span> times.</h3>

      <!--Edit and Delete are only for creator-->
      ${hasUser ? buttonTemp(isOwner,data._id,goingInfo.isGoing,onGoing) : null}
    </div>
  </div>
</section>`;
const buttonTemp = (Owner,_id,isGoing,onGoing) => html`
  <div id="action-buttons">
    ${Owner
      ? html`
      <a href="/edit/${_id}" id="edit-btn">Edit</a>
      <a @click=${onDelete.bind(_id)} href="javascript:void(0)" id="delete-btn">Delete</a>`
      : likeBtnTemp(isGoing,onGoing)}
  </div>
`;

const likeBtnTemp=(isGoing,onGoing)=>
html`${!isGoing?html`<a @click=${onGoing}  href="javascript:void(0)" id="go-btn">Going</a>`:null}`


export async function detailsView(ctx) {
  const _id = ctx.params._id
  const [data,goingInfo] = await Promise.all([
    dataService.details(_id),
    dataService.getGoing(_id)
  ])
  const hasUser = Boolean(getUserData())
  const isOwner = Boolean(getOwner(data))
  
  ctx.render(detailsTemp(data, hasUser,goingInfo, isOwner,onGoing));

  async function onGoing() {
    // TODO
    const id={eventId:_id}
    await dataService.going(id)
    ctx.page.redirect(`/details/${_id}`)
  }
}


