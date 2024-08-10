import { dataService } from "../data/dataService.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

// TODO TEMPLATE
const dashboardTemp = (data) => html` <section id="dashboard-page" class="dashboard">
  <h1>Dashboard</h1>
  ${data.length > 0
    ? html`<ul class="other-books-list">
        ${data.map((card) => cardTemp(card))}
      </ul>`
    : html`<p class="no-books">No books in database!</p>`}
</section>`;

const cardTemp = (card) => html`
<li class="otherBooks">
                    <h3>${card.title}</h3>
                    <p>Type: ${card.type}</p>
                    <p class="img"><img src="${card.imageUrl}"></p>
                    <a class="button" href="/details/${card._id}">Details</a>
                </li>`;
export async function dashboardView(ctx) {
  const data = await dataService.getAll();
  ctx.render(dashboardTemp(data));
}
