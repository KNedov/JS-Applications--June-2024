import { dataService } from "../data/dataService.js";
import { html } from "../../../node_modules/lit-html/lit-html.js";


const dashboardTemp = (data) => html`
    <h2>Collection</h2>

    ${data.length > 0
        ? html`
            <section id="tattoos">
                ${data?.map((card) => cardTemp(card))}
            </section>`
        : html`
            <h2 id="no-tattoo">
              Collection is empty, be the first to contribute
            </h2>`}
`;
const cardTemp = (card) => html` <div class="tattoo">
    <img src="${card.imageUrl}" alt="example1" />
    <div class="tattoo-info">
        <h3 class="type">${card.type}</h3>
        <span>Uploaded by </span>
        <p class="user-type">${card.userType}</p>
        <a class="details-btn" href="/details/${card._id}">Learn More</a>
    </div>
</div>`;
export async function dashboardView(ctx) {
    const data = await dataService.getAll();
    ctx.render(dashboardTemp(data));
}
