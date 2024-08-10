import { dataService } from "../data/dataService.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

// TODO TEMPLATE
const dashboardTemp = (data) => html` <section id="dashboard">
  <h2>Albums</h2>
  ${data.length > 0
    ? html`<ul class="card-wrapper">
        ${data.map((card) => cardTemp(card))}
      </ul>`
    : html`<h2>There are no albums added yet.</h2>`}
</section>`;

const cardTemp = (card) => html` <li class="card">
  <img src="${card.imageUrl}" alt="travis" />
  <p><strong>Singer/Band: </strong><span class="singer">${card.singer}</span></p>
  <p><strong>Album name: </strong><span class="album">${card.album}</span></p>
  <p>
    <strong>Sales:</strong
    ><span class="sales">${card.sales}</span>
  </p>
  <a class="details-btn" href="/details/${card._id}">Details</a>
</li>`;
export async function dashboardView(ctx) {
  const data = await dataService.getAll();
  ctx.render(dashboardTemp(data));
}
