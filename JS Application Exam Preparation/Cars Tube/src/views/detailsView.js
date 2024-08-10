import { dataService } from "../data/dataService.js";

import { onDelete } from "./delete.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
import { getOwner } from "../utils.js";
// TODO TEMPLATE and bind ID for delete
let context = null;
const detailsTemp = (data, hasUser, isOwner) => html` <section
    id="listing-details"
>
    <h1>Details</h1>
    <div class="details-info">
        <img src="${data.imageUrl}" />
        <hr />
        <ul class="listing-props">
            <li><span>Brand:</span>${data.brand}</li>
            <li><span>Model:</span>${data.model}</li>
            <li><span>Year:</span>${data.year}</li>
            <li><span>Price:</span>${data.price}$</li>
        </ul>

        <p class="description-para">
            ${data.description}
        </p>
        ${hasUser ? buttonTemp(data._id, isOwner) : null}
    </div>
</section>`;

const buttonTemp = (id, isOwner) => html`
    ${isOwner
        ? html` <div class="listings-buttons">
              <a href="/edit/${id}" class="button-list">Edit</a>
              <a
                  @click="${onDelete.bind(id)}href"
                  ="javascriptVoid(0)"
                  class="button-list"
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
