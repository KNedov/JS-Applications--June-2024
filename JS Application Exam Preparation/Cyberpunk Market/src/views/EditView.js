import { dataService } from "../data/dataService.js";

import { createSubmitHandler } from "../utils.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
import { notify } from "./notifyView.js";
// TODO TEMPLATE
let id = null;
let context = null;
const editTemp = (onEdit, data) => html`
  <section id="edit">
          <div class="form form-item">
            <h2>Edit Your Item</h2>
            <form @submit=${onEdit} class="edit-form">
              <input type="text" name="item" id="item" placeholder="Item" .value=${data.item} />
              <input
                type="text"
                name="imageUrl"
                id="item-image"
                placeholder="Your item Image URL"
                .value=${data.imageUrl}
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
                .value=${data.price}
              />
              <input
                type="text"
                name="availability"
                id="availability"
                placeholder="Availability Information"
                .value=${data.availability}
              />
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Item Type"
                .value=${data.type}
              />
              <textarea
                id="description"
                name="description"
                placeholder="More About The Item"
                rows="10"
                cols="50"
                .value=${data.description}
              ></textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`;
export async function editView(ctx) {
  context = ctx;
  const _id = ctx.params._id;
  id = _id;
  const data = await dataService.details(_id);
  ctx.render(editTemp(createSubmitHandler(onEdit), data));
}
async function onEdit({
  item,
  imageUrl,
  price,
  availability,
  type,
  description,
  
}) {
  if ((!item || !imageUrl || !price || !availability||!type||!description))
    return notify("All field are required");

  await dataService.edit(id, {item, imageUrl,price,availability,type, description});
  context.page.redirect(`/details/${id}`);
}
