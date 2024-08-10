import { html } from "../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler, getUserData } from "../utils.js";
import { dataService } from "../data/dataService.js";
let context = null;

const searchTemp = (onSearch, user, data) => html` <section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input
            id="search-input"
            type="text"
            name="search"
            placeholder="Enter desired albums's name"
        />
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    ${data
        ? html` <div class="search-result">
              ${data?.length > 0
                  ? data.map((card) => cardTemp(card, user))
                  : html`<p class="no-result">No result.</p>`}
          </div>`
        : null}
</section>`;
const cardTemp = (card, user) => html`
    <div class="card-box">
        <img src="${card.imgUrl}" />
        <div>
            <div class="text-center">
                <p class="name">Name: ${card.name}</p>
                <p class="artist">Artist: ${card.artist}</p>
                <p class="genre">Genre: ${card.genre}</p>
                <p class="price">Price: ${card.price}</p>
                <p class="date">Release Date: ${card.releaseDate}</p>
            </div>
            ${user
                ? html`<div class="btn-group">
                      <a href="/details/${card._id}" id="details">Details</a>
                  </div>`
                : null}
        </div>
    </div>
`;
export function searchView(ctx) {
    context = ctx;

    ctx.render(searchTemp(onSearch));
}
async function onSearch(e) {
    const inputRef=e.currentTarget.previousElementSibling
    const user = Boolean(getUserData());
    const query = inputRef.value
    inputRef.value=''
    if (!query) return window.alert("the field is required");
    const data = await dataService.search(query);
    context.render(searchTemp(onSearch, user, data));
}