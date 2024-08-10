import { dataService } from "../data/dataService.js";

import { createSubmitHandler } from "../utils.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
// TODO TEMPLATE
let id = null;
let context = null;
const editTemp = (onEdit, data) => html`
  <section id="edit">
    <div class="form form-auto">
      <h2>Edit Your Car</h2>
      <form @submit=${onEdit} class ="edit-form">
        <input
          type="text"
          name="model"
          id="model"
          placeholder="Model"
          .value=${data.model}
        />
        <input
          type="text"
          name="imageUrl"
          id="car-image"
          placeholder="Your Car Image URL"
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
          type="number"
          name="weight"
          id="weight"
          placeholder="Weight in Kg"
          .value=${data.weight}
        />
        <input
          type="text"
          name="speed"
          id="speed"
          placeholder="Top Speed in Kmh"
          .value=${data.speed}
        />
        <textarea
          id="about"
          name="about"
          placeholder="More About The Car"
          rows="10"
          cols="50"
          .value=${data.about}
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
async function onEdit({ model, imageUrl, price, weight, speed, about }) {
  if ((!model || !imageUrl || !price || !weight || !speed, !about))
    return window.alert("All field are required");

  await dataService.edit(id, { model, imageUrl, price, weight, speed, about });
  context.page.redirect(`/details/${id}`);
}
