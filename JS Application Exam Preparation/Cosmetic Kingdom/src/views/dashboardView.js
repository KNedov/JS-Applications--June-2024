import { dataService } from "../data/dataService.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";
const dashboardTemp = (data) => html`
  <h2>Products</h2>
  ${data.length > 0
    ? html` <section id="dashboard">
        ${data.map((card) => cardTemp(card))}
      </section>`
    : html`<h2>No products yet.</h2>`}
`;
const cardTemp = (card) => html` <div class="product">
  <img src="${card.imageUrl}" alt="example1" />
  <p class="title">${card.name}</p>
  <p><strong>Price:</strong><span class="price">${card.price}</span>$</p>
  <a class="details-btn" href="/details/${card._id}">Details</a>
</div>`;
export async function dashboardView(ctx) {
  const data = await dataService.getAll();
  ctx.render(dashboardTemp(data));
}
