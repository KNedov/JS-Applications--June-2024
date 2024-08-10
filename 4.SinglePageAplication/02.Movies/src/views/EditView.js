import { dataService } from "../data/dataService.js";

import { createSubmitHandler } from "../utils.js";

import { html } from "../../../node_modules/lit-html/lit-html.js";
// TODO TEMPLATE
let id = null;
let context = null;
const editTemp = (onEdit, data) => html`
 <section id="edit-movie" class="view-section">
        <form @submit=${onEdit} class="text-center border border-light p-5" action="#" method="">
          <h1>Edit Movie</h1>
          <div class="form-group">
            <label for="title">Movie Title</label>
            <input
              id="title"
              type="text"
              class="form-control"
              placeholder="Movie Title"
              .value=${data.img}
              name="title"
            />
          </div>
          <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea
              class="form-control"
              placeholder="Movie Description..."
              name="description"
              .value=${data.title}
            ></textarea>
          </div>
          <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input
              id="imageUrl"
              type="text"
              class="form-control"
              placeholder="Image Url"
              .value=${data.description}
              name="img"
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </section>
`;
export async function editView(ctx) {
  context = ctx;
  const _id = ctx.params._id;
  id = _id;
  const data = await dataService.details(_id);
  ctx.render(editTemp(createSubmitHandler(onEdit), data));
}
async function onEdit({ title, description,img }) {
  if ((!title || !description || !img))
    return window.alert("All field are required");

  await dataService.edit(id, { title, description, img});
  context.page.redirect(`/details/${id}`);
}
