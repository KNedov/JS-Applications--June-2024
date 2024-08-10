import { dataService } from "../data/dataService.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

// TODO TEMPLATE
const dashboardTemp = (data) => html`
  <h2>Fun Facts</h2>
  ${data.length > 0
    ? html` <section id="dashboard">
        ${data.map((card) => cardTemp(card))}
      </section>`
    : html`<h2>No Fun Facts yet.</h2>`}
  <!-- Display an h2 if there are no posts -->
`;
const cardTemp = (card) => html` 
          <div class="fact">
            <img src="${card.imageUrl}" alt="example1" />
            <h3 class="category">${card.category}</h3>
            <p class="description">${card.description}</p>
            <a class="details-btn" href="/details/${card._id}">More Info</a>
          </div>`;
export async function dashboardView(ctx) {
  const data = await dataService.getAll();
  ctx.render(dashboardTemp(data));
}
