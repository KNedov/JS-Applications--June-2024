import { dataService } from "../data/dataService.js";


import { onDelete } from "./delete.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
import { getOwner } from "../utils.js";
// TODO TEMPLATE and bind ID for delete
let context=null
const detailsTemp = (
  data, hasUser,isOwner
) => html`<section id="details">
<div id="details-wrapper">
  <img id="details-img" src="${data.imageUrl}" alt="example1" />
  <p id="details-title">${data.model}</p>
  <div id="info-wrapper">
    <div id="details-description">
      <p class="price">Price: €${data.price}</p>
      <p class="weight">Weight: ${data.weight} kg</p>
      <p class="top-speed">Top Speed: ${data.speed} kph</p>
      <p id="car-description">
        ${data.about}</p>
    </div>
    <!--Edit and Delete are only for creator-->
    ${hasUser?buttonTepm(data._id,isOwner):null}
  </div>
</div>
</section>`;


const buttonTepm=(id,isOwner)=>html`
${isOwner?html`<div id="action-buttons">
  <a href="/edit/${id}" id="edit-btn">Edit</a>
  <a @click=${onDelete.bind(id)}href="javascriptVoid(0)" id="delete-btn">Delete</a>
</div>`:null}
`

export async function detailsView(ctx) {
  context=ctx
  const _id = ctx.params._id;
 

  const data = await dataService.details(_id)
  const isOwner=Boolean(getOwner(data))
  const hasUser=Boolean(ctx.userData)
  
  
  ctx.render(detailsTemp(data,isOwner,hasUser));

}
