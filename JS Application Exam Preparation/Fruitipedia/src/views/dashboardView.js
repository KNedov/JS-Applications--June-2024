import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";


const noFruitTemp=  ()=>html`<h2>No fruit info yet.</h2>`

const dashTemplate = (fruits) => html` <section id="dashboard">
  <!-- Display a div with information about every post (if any)-->
 ${fruits.map(fruit=>fruitTemp(fruit))}
  
</section>`;
const fruitTemp=(fruit)=>html`
 <div class="fruit">
        <img src="./${fruit.imageUrl}" alt="example1" />
        <h3 class="title">${fruit.name}</h3>
        <p class="description">
           ${fruit.description}
        </p>
        <a class="details-btn" href="/details/${fruit._id}">More Info</a>
  </div>`
export async function showDashboardView(ctx) {
  const data = await dataService.getAll();
  if (data.length>0) {
    ctx.render(dashTemplate(data));
  }else{
    ctx.render(noFruitTemp());
  }
  
}