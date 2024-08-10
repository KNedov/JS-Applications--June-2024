import { dataService } from "../data/dataService.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../utils.js";

// TODO TEMPLATE
const dashboardTemp = (data, hasUser) => html` <section id="catalogPage">
    <h1>All Albums</h1>
    ${data.length > 0
        ? data.map((card) => cardTemp(card, hasUser))
        : html`<p>No Albums in Catalog!</p>`}
</section>`;

const cardTemp = (card, hasUser) => html` <div class="card-box">
    <img src=".${card.imgUrl}" />
    <div>
        <div class="text-center">
            <p class="name">Name: ${card.name}</p>
            <p class="artist">Artist: ${card.artist}</p>
            <p class="genre">Genre: ${card.genre}</p>
            <p class="price">Price: ${card.price}</p>
            <p class="date">Release Date: ${card.releaseDate}</p>
        </div>
        ${hasUser
            ? html` 
            <div class="btn-group">
                  <a href="/details/${card._id}" id="details">Details</a>
            </div>`
            : null}
    </div>
</div>`;
export async function dashboardView(ctx) {
    const hasUser = Boolean(getUserData());
    const data = await dataService.getAll();
    ctx.render(dashboardTemp(data, hasUser));
}
