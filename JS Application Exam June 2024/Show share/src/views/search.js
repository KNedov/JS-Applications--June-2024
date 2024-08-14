import { html } from "../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler } from "../utils.js";
import { dataService } from "../data/dataService.js";
let context = null;
const searchTemp = (onSearch, data) => html` <section id="search">
    <div class="form">
        <h2>Search</h2>
        <form @submit=${onSearch} class="search-form">
            <input type="text" name="search" id="search-input" />
            <button class="button-list">Search</button>
        </form>
    </div>
    <h4>Results:</h4>
    <div class="search-result">
        ${data?.length > 0
            ? data?.map((card) => cardTemp(card))
            : html`<p class="no-result">
                  There is no TV show with this title
              </p>`}
    </div>
</section>`;
const cardTemp = (card) => html`
    <div class="show">
        <img src="${card.imageUrl}" alt="example1" />
        <div class="show">
            <h3 class="title">${card.title}</h3>
            <p class="genre">Genre: ${card.genre}</p>
            <p class="country-of-origin">Country of Origin: ${card.country}</p>
            <a class="details-btn" href="/details/${card._id}">Details</a>
        </div>
    </div>
`;
export function searchView(ctx) {
    context = ctx;
    ctx.render(searchTemp(createSubmitHandler(onSearch)));
}
async function onSearch(search) {
    const query = search.search;
    if (!query) return window.alert("the field is required");
    const data = await dataService.search(query);
    context.render(searchTemp(createSubmitHandler(onSearch), data));
}
