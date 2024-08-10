import { dataService } from "../data/dataService.js";

import { onDelete } from "./delete.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
import { getOwner } from "../utils.js";
// TODO TEMPLATE and bind ID for delete
let context = null;
const detailsTemp = (data, hasUser, isOwner) => html` <section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${data.imgUrl}" />
        </div>
        <div class="albumInfo">
            <div class="albumText">
                <h1>Name: ${data.name}</h1>
                <h3>Artist: ${data.artist}</h3>
                <h4>Genre: ${data.genre}</h4>
                <h4>Price: ${data.price}</h4>
                <h4>Date: ${data.releaseDate}</h4>
                <p>
                    Description: ${data.description}
                </p>
            </div>
            ${hasUser ? buttonTemp(data._id, isOwner) : null}
        </div>
    </div>
</section>`;

const buttonTemp = (id, isOwner) => html`
    ${isOwner
        ? html` <div class="actionBtn">
              <a href="/edit/${id}" class="edit">Edit</a>
              <a
                  @click="${onDelete.bind(id)}href"
                  ="javascriptVoid(0)"
                  class="remove"
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
