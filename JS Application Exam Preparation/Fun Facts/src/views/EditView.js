import { dataService } from "../data/dataService.js";

import { createSubmitHandler } from "../utils.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
// TODO TEMPLATE
let id = null;
let context = null;
const editTemp = (onEdit, data) => html`
 <section id="edit">
          <div class="form">
            <h2>Edit Fact</h2>
            <form @submit =${onEdit} class="edit-form">
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Category"
                .value=${data.category}
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
                rows="10"
                cols="50"
                .value=${data.description}
              ></textarea>
              <textarea
                id="additional-info"
                name="additional-info"
                placeholder="Additional Info"
                rows="10"
                cols="50"
                .value=${data.moreInfo}
              ></textarea>
              <button type="submit">Post</button>
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
async function onEdit({category,'image-url':imageUrl,description,'additional-info':moreInfo}) {
  if ((!category||!imageUrl||!description||!moreInfo))
    return window.alert("All field are required");

  await dataService.edit(id, {category,imageUrl,description,moreInfo});
  context.page.redirect(`/details/${id}`);
}
