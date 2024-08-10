import { dataService } from "../data/dataService.js";

import { onDelete } from "./delete.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
import { getOwner } from "../utils.js";
// TODO TEMPLATE and bind ID for delete
let context = null;
const detailsTemp = (data, hasUser, isOwner) => html`
<section id="meme-details">
  <h1>Meme Title: ${data.title}</h1>
  <div class="meme-details">
    <div class="meme-img">
      <img alt="meme-alt" src="${data.imageUrl}" />
    </div>
    <div class="meme-description">
      <h2>Meme Description</h2>
      <p>
      ${data.description}
      </p>
      <!--Edit and Delete are only for creator-->
      ${hasUser ? buttonTepm(data._id, isOwner) : null}
    </div>
  </div>
</section>`;

const buttonTepm = (id, isOwner) => html`
  ${isOwner
    ? html`
        <a class="button warning" href="/edit/${id}">Edit</a>
        <button @click=${onDelete.bind(id)} class="button danger">
          Delete
        </button>
      `
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
