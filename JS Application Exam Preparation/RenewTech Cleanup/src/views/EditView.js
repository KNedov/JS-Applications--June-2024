import { dataService } from "../data/dataService.js";

import { createSubmitHandler } from "../utils.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
// TODO TEMPLATE
let id = null;
let context = null;
const editTemp = (onEdit, data) => html`
  <section id="edit">
          <div class="form">
            <img class="border" src="./images/border.png" alt="" />
            <h2>Edit Solution</h2>
            <form @submit=${onEdit} class="edit-form">
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Solution Type"
                .value=${data.type}
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
                .value=${data.imageUrl}
              />
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                rows="2"
                cols="10"
                .value=${data.description}
              ></textarea>
              <textarea
                id="more-info"
                name="more-info"
                placeholder="more Info"
                rows="2"
                cols="10"
                .value=${data.learnMore}
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
async function onEdit({ type,'image-url': imageUrl, description, 'more-info':learnMore }) {
  if ((!type || !imageUrl || !description || !learnMore))
    return window.alert("All field are required");

  await dataService.edit(id, { type, imageUrl, description, learnMore});
  context.page.redirect(`/details/${id}`);
}
