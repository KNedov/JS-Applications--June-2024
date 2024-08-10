import { dataService } from "../data/dataService.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

// TODO TEMPLATE
const dashboardTemp = (data) => html`
  <section id="dashboard">
    <h2>Collectibles</h2>
    ${data.length>0?html`<ul class="card-wrapper">
    ${data.map((card) => cardTemp(card))}</ul>`
    :html`<h2>There are no items added yet.</h2>`} 
  </section>`
    
 
const cardTemp = (card) => html` 
            <li class="card">
              <img src="{card.imageUrl}" alt="travis" />
              <p>
                <strong>Brand: </strong><span class="brand">${card.brand}</span>
              </p>
              <p>
                <strong>Model: </strong
                ><span class="model">${card.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${card.value}</span>$</p>
              <a class="details-btn" href="/details/${card._id}">Details</a>
            </li>`;
export async function dashboardView(ctx) {
  const data = await dataService.getAll();
  ctx.render(dashboardTemp(data));
}
