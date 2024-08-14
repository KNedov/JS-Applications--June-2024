import { dataService } from "../data/dataService.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

const dashboardTemp = (data) => html`
    <h2>Users Recommendations</h2>
    ${data.length > 0
        ? html`<section id="shows">
              ${data.map((card) => cardTemp(card))}
          </section>`
        : html`<h2 id="no-show">No shows Added.</h2>`}
`;

const cardTemp = (card) => html` <div class="show">
    <img src="${card.imageUrl}" alt="example1" />
    <div class="show-info">
        <h3 class="title">${card.title}</h3>
        <p class="genre">Genre: ${card.genre}</p>
        <p class="country-of-origin">Country of Origin: ${card.country}</p>
        <a class="details-btn" href="/details/${card._id}">Details</a>
    </div>
</div>`;
export async function dashboardView(ctx) {
    const data = await dataService.getAll();
    ctx.render(dashboardTemp(data));
}
