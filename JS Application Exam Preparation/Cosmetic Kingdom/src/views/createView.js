import { dataService } from "../data/dataService.js";
import { createSubmitHandler } from "../utils.js";
import {html} from "../../../node_modules/lit-html/lit-html.js";

let context=null
const createTemp=(onCreate)=>html`<section id="create">
<div class="form">
  <h2>Add Product</h2>
  <form @submit =${onCreate} class="create-form">
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Product Name"
    />
    <input
      type="text"
      name="imageUrl"
      id="product-image"
      placeholder="Product Image"
    />
    <input
      type="text"
      name="category"
      id="product-category"
      placeholder="Category"
    />
    <textarea
      id="product-description"
      name="description"
      placeholder="Description"
      rows="5"
      cols="50"
    ></textarea>
    
    <input
      type="text"
      name="price"
      id="product-price"
      placeholder="Price"
    />

    <button type="submit">Add</button>
  </form>
</div>
</section>`
export function createView(ctx) {
  context=ctx
   ctx.render(createTemp(createSubmitHandler(onCreate)))
}
async function onCreate({name,imageUrl,category,description,price}) {
    if (!name||!imageUrl||!category||!description||!price)return window.alert('All fields are required')
    await dataService.create({name,imageUrl,category,description,price})
 context.page.redirect('/dashboard')
}