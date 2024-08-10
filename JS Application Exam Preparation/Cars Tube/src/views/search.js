import { html } from "../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler, getUserData } from "../utils.js";
import { dataService } from "../data/dataService.js";
let context = null;

const searchTemp = (onSearch, user, data) => html` <section id="search-cars">
<h1>Filter by year</h1>

<div class="container">
    <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
    <button @click=${onSearch} class="button-list">Search</button>
</div>

<h2>Results:</h2>
<div class="listings">
   
              ${data?.length > 0
                  ? data.map((card) => cardTemp(card, user))
                  : html`<p class="no-cars"> No results.</p>`}
          
  </div>
        </section>`;
const cardTemp = (card) => html`
    <div class="listing">
                    <div class="preview">
                        <img src="${card.imageUrl}">
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