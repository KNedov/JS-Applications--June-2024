import { dataService } from "../data/dataService.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";

// TODO TEMPLATE
const dashboardTemp = (data) => html`
<section id="meme-feed">
  <h1>All Memes</h1>
  <div id="memes">
        ${data.length>0?data.map((card) => cardTemp(card))
          :html`<p class="no-memes">No memes in database.</p>`}
        </div>
        </section>`
const cardTemp = (card) =>
  html` 
  <div class="meme">
    <div class="card">
      <div class="info">
        <p class="meme-title">${card.title}</p>
        <img class="meme-image" alt="meme-img" src="${card.imageUrl}" />
      </div>
      <div id="data-buttons">
        <a class="button" href="/details/${card._id}">Details</a>
      </div>
    </div>
  </div>`;
export async function dashboardView(ctx) {
  const data = await dataService.getAll();
  ctx.render(dashboardTemp(data));
}
