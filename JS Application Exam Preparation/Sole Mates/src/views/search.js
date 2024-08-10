import { html } from "../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler, getUserData } from "../utils.js";
import { dataService } from "../data/dataService.js"
let context = null;

const searchTemp = (onSearch,user, data) =>html`
  <section id="search">
          <h2>Search by Brand</h2>

          <form @submit=${onSearch} class="search-wrapper cf">
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit">Search</button>
          </form>

          <h3>Results:</h3>

        <div id="search-container">
          <ul class="card-wrapper">
                ${
                  data?.length > 0? data?.map((card) => cardTemp(card,user)): html`<h2>There are no results found.</h2>`
                }
          </ul>
        </div>
          
      </section>`;
const cardTemp = (card,user) =>html`
  <li class="card">
    <img src="${card.imageUrl}" alt="travis" />
    <p><strong>Brand: </strong><span class="brand">${card.brand}</span></p>
    <p>
      <strong>Model: </strong
      ><span class="model">${card.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${card.value}</span>$</p>
    ${user?html`<a class="details-btn" href="/details/${card._id}">Details</a>`:null}
  </li>
`;
export function searchView(ctx) {
  context = ctx;
  
  ctx.render(searchTemp(createSubmitHandler(onSearch)));
}
async function onSearch(search) {
  const user=Boolean(getUserData())
  const query = search.search;
  if (!query) return window.alert("the field is required");
  const data = await dataService.search(query);
  context.render(searchTemp(createSubmitHandler(onSearch),user, data));
}
