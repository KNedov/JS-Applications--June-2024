import { dataService } from "../data/dataService.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

// TODO TEMPLATE
const dashboardTemp = (data) => html`
  <h2>Current Events</h2>
  ${data.length > 0
    ? html` <section id="dashboard">
        ${data.map((card) => cardTemp(card))}
      </section>`
    : html`<h4>No Events yet.</h4>`}
  <!-- Display an h2 if there are no posts -->
`;
const cardTemp = (card) => html` 
          <div class="event">
            <img src="${card.imageUrl}" alt="example1" />
            <p class="title">
              ${card.name}
            </p>
            <p class="date">${card.date}</p>
            <a class="details-btn" href="/details/${card._id}">Details</a>
          </div>`;
export async function dashboardView(ctx) {
  const data = await dataService.getAll();
  ctx.render(dashboardTemp(data));
}
