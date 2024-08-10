import { dataService } from "../data/dataService.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

// TODO TEMPLATE
const dashboardTemp = (data) => html`
  <h2>Solutions</h2>
  ${data.length > 0
    ? html` <section id="solutions">
        ${data.map((card) => cardTemp(card))}
      </section>`
    : html`<h2 id="no-solution">No Solutions Added.</h2>`}
  <!-- Display an h2 if there are no posts -->
`;
const cardTemp = (card) => html` 
          <div class="solution">
            <img src="${card.imageUrl}" alt="example1" />
            <div class="solution-info">
              <h3 class="type">${card.type}</h3>
              <p class="description">
                ${card.description}
              </p>
              <a class="details-btn" href="/details/${card._id}">Learn More</a>
            </div>
          </div>`;
export async function dashboardView(ctx) {
  const data = await dataService.getAll();
  ctx.render(dashboardTemp(data));
}
