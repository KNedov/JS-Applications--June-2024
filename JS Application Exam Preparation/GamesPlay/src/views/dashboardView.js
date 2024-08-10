import { dataService } from "../data/dataService.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

// TODO TEMPLATE
const dashboardTemp = (data) => html`
<section id="catalog-page">
  <h1>All Games</h1>
  ${data.length > 0
    ? html`<ul class="card-wrapper">
        ${data.map((card) => cardTemp(card))}
      </ul>`
    : html`<h3 class="no-articles">No articles yet</h3>`}
</section>`;

const cardTemp = (card) => html` <div class="allGames">
<div class="allGames-info">
    <img src="${card.imageUrl}">
    <h6>${card.category}</h6>
    <h2>${card.title}</h2>
    <a href="/details/${card._id}" class="details-button">Details</a>
</div>

</div>`;
export async function dashboardView(ctx) {
  const data = await dataService.getAll();
  ctx.render(dashboardTemp(data));
}
