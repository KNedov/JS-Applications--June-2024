import { html } from "../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler } from "../utils.js";
import {dataService } from "../data/dataService.js";
let context=null
const searchTemp=(onSearch,data)=>html`
 <section id="search">
<div class="form">
  <h4>Search</h4>
  <form @submit =${onSearch} class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>
  <div class="search-result">
        ${data?.length>0?data?.map(card=>cardTemp(card)):html`<h2 class="no-avaliable">No result.</h2>`}
       

            </div>
          
        </section>`
const cardTemp=(card)=>html`

            <!--If there are matches display a div with information about every motorcycle-->
            <div class="motorcycle">
          <img src="${card.imageUrl}" alt="example1" />
          <h3 class="model">${card.model}</h3>
            <a class="details-btn" href="/detail/${card._id}">More Info</a>
        </div>
          `
export function searchView(ctx) {
    context=ctx
    ctx.render(searchTemp(createSubmitHandler(onSearch)))
}
async function onSearch(search) {
const query=search.search
if (!query)return window.alert('the field is required')
    const data= await dataService.search(query)
    context.render(searchTemp(createSubmitHandler(onSearch),data))
}