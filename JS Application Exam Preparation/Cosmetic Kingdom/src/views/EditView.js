import { dataService } from "../data/dataService.js";

import { createSubmitHandler } from "../utils.js";

import {html} from "../../../node_modules/lit-html/lit-html.js";

let id = null;
let context=null
const editTemp=(onEdit,data)=>html`
<section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form @submit =${onEdit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
                .value=${data.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
                .value=${data.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
                .value=${data.category}
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
                .value=${data.description}
              ></textarea>
              
              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
                .value=${data.price}
              />
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`
export async function editView(ctx) {
  context=ctx
  const _id = ctx.params._id
  id = _id;
  const data = await dataService.details(_id);
  ctx.render(editTemp(createSubmitHandler(onEdit),data));
}
async function onEdit(
  { name,imageUrl, category, description,price },

) {
  console.log(name,imageUrl,category,description,price);

 
  
  if (!name || !imageUrl || !category || !description,!price)
    return window.alert("All field are required");

  await dataService.edit(id, { name, imageUrl, category, description,price });
  context.page.redirect(`/dashboard`);
}
