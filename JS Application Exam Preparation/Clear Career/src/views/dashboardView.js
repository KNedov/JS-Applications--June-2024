import { dataService } from "../data/dataService.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

// TODO TEMPLATE
const dashboardTemp = (data) => html` <section id="dashboard">
  <h2>Job Offers</h2>
  ${data.length > 0
    ? html`
        ${data.map((card) => cardTemp(card))}
      `
    : html`<h2>No offers yet.</h2>`}
</section>`;

const cardTemp = (card) => html`
<div class="offer">
  <img src="${card.imageUrl}" alt="example1" />
  <p>
    <strong>Title: </strong><span class="title">${card.title}</span>
  </p>
  <p><strong>Salary:</strong><span class="salary">${card.salary}</span></p>
  <a class="details-btn" href="/details/${card._id}">Details</a>
</div>`;
export async function dashboardView(ctx) {
  const data = await dataService.getAll();
  ctx.render(dashboardTemp(data));
}
