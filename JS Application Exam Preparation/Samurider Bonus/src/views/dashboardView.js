import { dataService } from "../data/dataService.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

// TODO TEMPLATE
const dashboardTemp = (data) => html`
   <h2>Available Motorcycles</h2>
  ${data.length > 0
    ? html` <section id="dashboard">
        ${data.map((card) => cardTemp(card))}
      </section>`
    : html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}
  <!-- {model,imageUrl,year,mileage,contact,about} -->
`;
const cardTemp = (card) => html` 
            <div class="motorcycle">
            <img src="${card.imageUrl}" alt="example1" />
            <h3 class="model">${card.model}</h3>
            <p class="year">Year: ${card.year}</p>
            <p class="mileage">Mileage: ${card.mileage} km.</p>
            <p class="contact">Contact Number: ${card.contact}</p>
            <a class="details-btn" href="/details/${card._id}">More Info</a>
          </div>`;
export async function dashboardView(ctx) {
  const data = await dataService.getAll();
  ctx.render(dashboardTemp(data));
}
