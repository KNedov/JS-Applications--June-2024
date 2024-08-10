import { dataService } from "../data/dataService.js";

import { createSubmitHandler } from "../utils.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
// TODO TEMPLATE
let id = null;
let context = null;
const editTemp = (onEdit, data) => html`
 <section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form @submit =${onEdit} class="edit-form">
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
                  id="moto-image"
                  placeholder="Moto Image"
                  .value=${data.imageUrl}
                />
                <input
                type="number"
                name="year"
                id="year"
                placeholder="Year"
                .value=${data.year}
              />
              <input
              type="number"
              name="mileage"
              id="mileage"
              placeholder="mileage"
              .value=${data.mileage}
            />
            <input
              type="number"
              name="contact"
              id="contact"
              placeholder="contact"
              .value=${data.contact}
            />
              <textarea
                id="about"
                name="about"
                placeholder="about"
                rows="10"
                cols="50"
                .value=${data.about}
              ></textarea>
                <button type="submit">Edit Motorcycle</button>
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
async function onEdit({model,imageUrl,year,mileage,contact,about}) {
  if ((!model || !imageUrl || !year || !mileage || !contact, !about))
    return window.alert("All field are required");

  await dataService.edit(id, {model,imageUrl,year,mileage,contact,about});
  context.page.redirect(`/details/${id}`);
}
