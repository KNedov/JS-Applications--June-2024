import { html } from "../../node_modules/lit-html/lit-html.js";
import { auth } from "../service/auth.js";

let context=null
const searchTemplate = (data) => html` <section id="search">

<div class="form">
  <h2>Search</h2>
  <form @submit=${onSubmit} class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
${data&&cardResultTemp(data)}
        </section>`;

const cardResultTemp=(items)=>html`
<h4>Results:</h4>
          <div class="search-result">
          ${items.length===0?noItemsTemp():items.map(item=>cardTemp(item))}
         
          <!--If there are matches display a div with information about every fruit-->
         
          </div>`

const cardTemp=(item)=>html`
<div class="fruit">
          <img src="${item.imageUrl}" alt="example1" />
          <h3 class="title">${item.name}</h3>
          <p class="description">${item.description}</p>
          <a class="details-btn" href="/details/${item._id}">More Info</a>
        </div>`
const noItemsTemp=()=>html`<p class="no-result">No result.</p>`

export async function showSearchView(ctx) {
    context=ctx
ctx.render(searchTemplate())
}
async function onSubmit(e) {
 const result=await auth.handleSearch(e)
 if (result) {
    context.render(searchTemplate(result))
 }
 else{
  context.render(searchTemplate())
 }
}
