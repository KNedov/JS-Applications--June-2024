import { dataService } from "../data/dataService.js";
import {html} from "../../../node_modules/lit-html/lit-html.js";
import { render } from "../lib.js";

const dashboardTemp=(data)=>html`
 
        ${data.length>0?html`
            <h2>Characters</h2>
            <section id="characters">
    ${data.map(card=>cardTemp(card))}
        </section>`:html`<h2>No added Heroes yet.</h2>`}
         <!-- Display an h2 if there are no posts -->
         `
const cardTemp=(card)=>html`

<div class="character">
    <img src="${card.imageUrl}" alt="example1" />
    <div class="hero-info">
      <h3 class="category">${card.category}</h3>
      <p class="description">${card.description}</p>
      <a class="details-btn" href="/details/${card._id}">More Info</a>
    </div>
 </div>`
export async function dashboardView() {
    const data= await dataService.getAll()
    render(dashboardTemp(data))
}