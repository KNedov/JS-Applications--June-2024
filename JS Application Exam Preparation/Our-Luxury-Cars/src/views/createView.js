import { dataService } from "../data/dataService.js";
import { createSubmitHandler } from "../utils.js";
import {html} from "../../../node_modules/lit-html/lit-html.js";

let context=null
const createTemp=(onCreate)=>html`<section id="create">
<div class="form form-auto">
  <h2>Share Your Car</h2>
  <form @submit =${onCreate} class="create-form">
    <input type="text" name="model" id="model" placeholder="Model"/>
    <input
      type="text"
      name="imageUrl"
      id="car-image"
      placeholder="Your Car Image URL"
    />
    <input
      type="text"
      name="price"
      id="price"
      placeholder="Price in Euro"
    />
    <input
      type="number"
      name="weight"
      id="weight"
      placeholder="Weight in Kg"
    />
    <input
      type="text"
      name="speed"
      id="speed"
      placeholder="Top Speed in Kmh"
    />
    <textarea
      id="about"
      name="about"
      placeholder="More About The Car"
      rows="10"
      cols="50"
    ></textarea>
    <button type="submit">Add</button>
  </form>
</div>
</section>`
export function createView(ctx) {
  context=ctx
   ctx.render(createTemp(createSubmitHandler(onCreate)))
}
async function onCreate({model,imageUrl,price,weight,speed,about}) {
  console.log({model,imageUrl,price,weight,speed,about});
  
  debugger
    if (!model||!imageUrl||!price||!weight||!speed||!about)return window.alert('All fields are required')
    await dataService.create({model,imageUrl,price,weight,speed,about})
 context.page.redirect('/dashboard')
}