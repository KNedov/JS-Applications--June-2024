import { dataService } from "../data/dataService.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

// TODO TEMPLATE
const dashboardTemp = (data) => html`
  <h3 class="heading">Market</h3>
  ${data.length > 0
    ? html` <section id="dashboard">
        ${data.map((card) => cardTemp(card))}
      </section>`
    : html`<h3 class="empty">No Items Yet</h3>`}
  <!-- Display an h2 if there are no posts -->
`;
const cardTemp = (card) =>
  html`
  <div class="item">
    <img src="${card.imageUrl}" alt="example1" />
    <h3 class="model">${card.item}</h3>
    <div class="item-info">
      <p class="price">Price: €${card.price}</p>
      <p class="availability">${card.availability}</p>
      <p class="type">Type: ${card.type}</p>
    </div>
    <a class="details-btn" href="/details/${card._id}">Uncover More</a>
  </div>`;
export async function dashboardView(ctx) {
  const data = await dataService.getAll();
  ctx.render(dashboardTemp(data));
}
