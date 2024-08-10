import { dataService } from "../data/dataService.js";

import { onDelete } from "./delete.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
import { getOwner } from "../utils.js";
// TODO TEMPLATE and bind ID for delete
let context = null;
const detailsTemp = (data, hasUser, isOwner) => html` <section id="details">
  <div id="details-wrapper">
    <p id="details-title">Shoe Details</p>
    <div id="img-wrapper">
      <img src="${data.imageUrl}" alt="example1" />
    </div>
    <div id="info-wrapper">
      <p>Brand: <span id="details-brand">${data.brand}</span></p>
      <p>Model: <span id="details-model">${data.model}</span></p>
      <p>Release date: <span id="details-release">${data.release}</span></p>
      <p>Designer: <span id="details-designer">${data.designer}</span></p>
      <p>Value: <span id="details-value">${data.value}</span></p>
    </div>
    ${hasUser ? buttonTepm(data._id, isOwner) : null}
  </div>
</section>`;

const buttonTepm = (id, isOwner) => html`
  ${isOwner
    ? html`<div id="action-buttons">
        <a href="/edit/${id}" id="edit-btn">Edit</a>
        <a
          @click="${onDelete.bind(id)}href"
          ="javascriptVoid(0)"
          id="delete-btn"
          >Delete</a
        >
      </div>`
    : null}
`;

export async function detailsView(ctx) {
  context = ctx;
  const _id = ctx.params._id;

  const data = await dataService.details(_id);
  const isOwner = Boolean(getOwner(data));
  const hasUser = Boolean(ctx.userData);

  ctx.render(detailsTemp(data, isOwner, hasUser));
}
