import { dataService } from "../data/dataService.js";

import { createSubmitHandler } from "../utils.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
// TODO TEMPLATE
let id = null;
let context = null;
const editTemp = (onEdit, data) => html`
  <section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form @submit=${onEdit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
                .value=${data.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image"
                .value=${data.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
                .value=${data.category}
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
                .value=${data.description}
              ></textarea>
              
              <label for="date-and-time">Event Time:</label>
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
              .value=${data.date}
            />

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
async function onEdit({name,imageUrl,category,description,date}) {
  if ((!name || !imageUrl || !category || !description||!date))
    return window.alert("All field are required");

  await dataService.edit(id,{name,imageUrl,category,description,date});
  context.page.redirect(`/details/${id}`);
}
