import { dataService } from "../data/dataService.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../utils.js";

// TODO TEMPLATE
const dashboardTemp = (data, hasUser) => html` <section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        ${data.length > 0
            ? data.map((card) => cardTemp(card, hasUser))
            : html`<p class="no-cars">No cars in database.</p>`}
    </div>
</section>`;

const cardTemp = (card, hasUser) => html` <div class="listing">
    <div class="preview">
        <img src="${card.imageUrl}" />
    </div>
    <h2>${card.brand} ${card.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${card.year}</h3>
            <h3>Price: ${card.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${card._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;
export async function dashboardView(ctx) {
    const hasUser = Boolean(getUserData());
    const data = await dataService.getAll();
    ctx.render(dashboardTemp(data, hasUser));
}
