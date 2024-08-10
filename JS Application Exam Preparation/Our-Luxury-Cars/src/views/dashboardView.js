import { dataService } from "../data/dataService.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

// TODO TEMPLATE
const dashboardTemp = (data) => html`
  <h3 class="heading">Our Cars</h3>
  ${data.length > 0
    ? html` <section id="dashboard">
        ${data.map((card) => cardTemp(card))}
      </section>`
    : html`<h3 class="nothing">Nothing to see yet</h3>`}
  <!-- Display an h2 if there are no posts -->
`;
const cardTemp = (card) => html` 
            <div class="car">
            <img src="${card.imageUrl}" alt="example1" />
            <h3 class="model">${card.model}</h3>
            <div class="specs">
              <p class="price">Price: €${card.price}</p>
              <p class="weight">Weight: ${card.weight} kg</p>
              <p class="top-speed">Top Speed: ${card.speed} kph</p>
            </div>
            <a class="details-btn" href="/details/${card._id}">More Info</a>
          </div>`;
export async function dashboardView(ctx) {
  const data = await dataService.getAll();
  ctx.render(dashboardTemp(data));
}
